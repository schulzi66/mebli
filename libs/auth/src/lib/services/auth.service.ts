import { Injectable } from '@angular/core';
import {
    Auth,
    authState,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    User,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FirebaseError } from 'firebase/app';
import { EMPTY, map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    public readonly user$: Observable<User | null> = EMPTY;
    public isLoggedIn = false;

    public constructor(private readonly auth: Auth, private readonly router: Router) {
        this.user$ = authState(this.auth);
        this.user$.pipe(map((user) => !!user)).subscribe((loggedIn: boolean) => (this.isLoggedIn = loggedIn));
    }

    public async loginWithGoogle(): Promise<void> {
        try {
            await signInWithPopup(this.auth, new GoogleAuthProvider());
            this.router.navigate(['/']);
        } catch (error: unknown) {
            console.error((error as FirebaseError).code);
        }
    }

    public async loginWithEmail(email: string, password: string): Promise<void> {
        try {
            await signInWithEmailAndPassword(this.auth, email, password);
            this.router.navigate(['/']);
        } catch (error: unknown) {
            console.error((error as FirebaseError).code);
        }
    }

    public async registerUser(email: string, password: string): Promise<void> {
        try {
            await createUserWithEmailAndPassword(this.auth, email, password);
            this.router.navigate(['/']);
        } catch (error: unknown) {
            console.error((error as FirebaseError).code);
        }
    }

    public async logout(): Promise<void> {
        await signOut(this.auth);
        await this.router.navigate(['/login']);
        location.reload();
    }
}
