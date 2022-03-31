/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { DbPaths, DbService } from '@mebli/db';
import { FirebaseError } from 'firebase/app';
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
    private email: string | undefined | null;

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
            this.profile$ = this.db.getDoc$<Profile>(DbPaths.PROFILES, user.uid);
            this.uid = user.uid;
            this.email = user.email;
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

    public async loginWithEmail(email: string, password: string): Promise<void> {
        try {
            await this.auth.signInWithEmailAndPassword(email, password);
            this.router.navigate(['/']);
        } catch (error: unknown) {
            console.error((error as FirebaseError).code);
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

    public async changeAccountName(newName: string): Promise<void> {
        if (this.uid && this.email) {
            await this.storeProfileData({
                uid: this.uid,
                email: this.email,
                accountName: newName,
            });
        }
    }

    public async changePassword(newPassword: string): Promise<void> {
        this.userAuth$.pipe(filter((user: User | null) => !!user?.uid)).subscribe(async (user: User | null) => {
            if (!user?.uid) {
                return;
            }
            user.updatePassword(newPassword);
        });
    }

    private async storeProfileData(data: Profile): Promise<void> {
        return this.db.setDoc<Profile>(DbPaths.PROFILES, data.uid, data, { merge: true });
    }
}
