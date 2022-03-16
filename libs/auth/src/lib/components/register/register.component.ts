import { Component } from '@angular/core';
import { DbPaths, DbService } from '@mebli/db';
import { AuthService } from '../../services/auth.service';
import { Profile } from './../../models/profile';

@Component({
    selector: 'mebli-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
    public email = '';
    public accountName = '';
    public password = '';
    public passwordConfirm = '';
    public passwordsMatch = true;

    public constructor(private readonly authService: AuthService, private readonly db: DbService) {}

    public async onRegister(): Promise<void> {
        this.passwordsMatch = this.password === this.passwordConfirm;
        if (!this.passwordsMatch) {
            return;
        }

        const accountNameAlreadyTaken = await this.db.docExists<Profile>(
            DbPaths.PROFILES,
            'accountName',
            '==',
            this.accountName
        );
        if (!accountNameAlreadyTaken) {
            await this.authService.registerUser(this.email, this.password, this.accountName);
        } else {
            console.error('Account already taken', this.accountName);
        }
    }

    public async onLoginWithGoogle(): Promise<void> {
        await this.authService.loginWithGoogle();
    }
}
