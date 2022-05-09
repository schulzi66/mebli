/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { DbPaths, DbService } from '@mebli/db';
import { FirebaseError } from 'firebase/app';
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { EMPTY, filter, Observable } from 'rxjs';
import { Profile } from '../models/profile';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    public profile$: Observable<Profile | undefined> = EMPTY;
    public readonly userAuth$: Observable<User | null> = EMPTY;
    public uid: string | undefined;
    public accountName: string | undefined;
    private returnValue: string | undefined | null;
    private currentUser: User | null | undefined;

    public constructor(
        private readonly auth: AngularFireAuth,
        private readonly router: Router,
        private readonly db: DbService
    ) {
        this.userAuth$ = this.auth.authState;
        this.userAuth$.subscribe((user: User | null) => {
            if (!user?.uid) {
                return;
            }
            this.currentUser = user;
            this.profile$ = this.db.getDoc$<Profile>(DbPaths.PROFILES, user.uid);
            this.profile$.subscribe((profile: Profile | undefined) => (this.accountName = profile?.accountName));
            this.uid = user.uid;
        });
    }

    public async loginWithGoogle(): Promise<void> {
        try {
            const credentials = await this.auth.signInWithPopup(new GoogleAuthProvider());
            await this.storeProfileData({
                uid: credentials.user!.uid!,
                email: credentials.user!.email!,
            });
            this.router.navigate(['/']);
        } catch (error: unknown) {
            console.error((error as FirebaseError).code);
        }
    }

    public async loginWithEmail(email: string, password: string): Promise<string | undefined> {
        try {
            await this.auth.signInWithEmailAndPassword(email, password).catch((error) => {
                this.returnValue = error.code;
            });
            this.router.navigate(['/']);
        } catch (error: unknown) {
            console.error((error as FirebaseError).code);
            return 'unknown';
        }

        if (this.returnValue != undefined && this.returnValue != null) {
            return this.returnValue;
        } else {
            return undefined;
        }
    }

    public async registerUser(email: string, password: string, accountName: string): Promise<void> {
        try {
            const credentials = await this.auth.createUserWithEmailAndPassword(email, password);
            await this.storeProfileData({
                uid: credentials.user!.uid!,
                email: credentials.user!.email!,
                accountName: accountName,
            });
            this.router.navigate(['/']);
        } catch (error: unknown) {
            console.error((error as FirebaseError).code);
        }
    }

    public async logout(): Promise<void> {
        await this.auth.signOut();
        await this.router.navigate(['/login']);
        location.reload();
    }

    public async changeAccountName(newName: string): Promise<boolean> {
        if (this.currentUser && this.uid && this.currentUser.email) {
            await this.storeProfileData({
                uid: this.uid,
                email: this.currentUser.email,
                accountName: newName,
            });
            return true;
        }
        return false;
    }

    public async isGmail(): Promise<boolean> {
        if (this.currentUser && this.currentUser.email != null && this.currentUser.email != undefined) {
            if (this.currentUser.email.endsWith('@gmail.com') || this.currentUser.email.endsWith('@googlemail.com')) {
                return true;
            } else {
                return false;
            }
        } else return false;
    }

    public async loginDataWrong(email: string, password: string): Promise<any> {
        if (
            await this.auth.signInWithEmailAndPassword(email, password).catch((error) => {
                const errorCode = error.code;
                if (errorCode == 'auth/wrong-password') {
                    return 'invalidPassword';
                }
                return '0';
            })
        )
            return 'true';
    }

    public async changePassword(newPassword: string, oldPassword: string): Promise<void> {
        if (!this.currentUser?.uid || !this.currentUser?.email) {
            return;
        }
        // Todo: Handle if wrong oldPassword is provided
        await reauthenticateWithCredential(
            this.currentUser,
            EmailAuthProvider.credential(this.currentUser.email, oldPassword)
        );
        this.currentUser.updatePassword(newPassword);
    }

    public async deleteProfile(
        confPassword: string
    ): Promise<'invalidPassword' | 'success' | 'unknown_error' | 'no_login' | 'tooManyRequests'> {
        if (!this.currentUser?.uid || !this.currentUser?.email) {
            return 'no_login';
        } else {
            return reauthenticateWithCredential(
                this.currentUser,
                EmailAuthProvider.credential(this.currentUser.email, confPassword)
            )
                .then(() => {
                    if (this.currentUser) {
                        this.currentUser.delete();
                        return 'success';
                    } else {
                        return 'unknown_error';
                    }
                })
                .catch((error: any) => {
                    if (error.code === 'auth/wrong-password') {
                        return 'invalidPassword';
                    } else if (error.code === 'auth/too-many-requests') {
                        return 'tooManyRequests';
                    } else {
                        return 'unknown_error';
                    }
                });
        }
    }

    public async deleteProfileGmail(): Promise<void> {
        this.userAuth$.pipe(filter((user: User | null) => !!user?.uid)).subscribe(async (user: User | null) => {
            if (!user?.uid || !user?.email) {
                return;
            }
            if (await this.isGmail()) {
                try {
                    await this.auth.signInWithPopup(new GoogleAuthProvider()).then(() => {
                        user.delete();
                        this.router.navigate(['/login']);
                    });
                } catch (error: unknown) {
                    console.error((error as FirebaseError).code);
                }
            }
        });
    }

    private async storeProfileData(data: Profile): Promise<void> {
        return this.db.setDoc<Profile>(DbPaths.PROFILES, data.uid, data, { merge: true });
    }
}
