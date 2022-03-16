import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { DbPaths, DbService } from '@mebli/db';
import { FirebaseError } from 'firebase/app';
import { EMPTY, Observable } from 'rxjs';
import { Profile } from '../models/profile';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    public profile$: Observable<Profile | undefined> = EMPTY;
    public readonly userAuth$: Observable<User | null> = EMPTY;

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
        });
    }

    public async loginWithGoogle(): Promise<void> {
        try {
            const credentials = await this.auth.signInWithPopup(new GoogleAuthProvider());
            await this.storeProfileData(credentials);
            this.router.navigate(['/']);
        } catch (error: unknown) {
            console.error((error as FirebaseError).code);
        }
    }

    public async loginWithEmail(email: string, password: string): Promise<void> {
        try {
            const credentials = await this.auth.signInWithEmailAndPassword(email, password);
            await this.storeProfileData(credentials);
            this.router.navigate(['/']);
        } catch (error: unknown) {
            console.error((error as FirebaseError).code);
        }
    }

    public async registerUser(email: string, password: string): Promise<void> {
        try {
            const credentials = await this.auth.createUserWithEmailAndPassword(email, password);
            await this.storeProfileData(credentials);
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

    private async storeProfileData(credentials: any): Promise<void> {
        const data = {
            uid: credentials.user.uid,
            email: credentials.user.email,
            // displayName: credentials.user.displayName,
        };
        return this.db.setDoc<Profile>(DbPaths.PROFILES, credentials.user.uid, data, { merge: true });
    }
}
