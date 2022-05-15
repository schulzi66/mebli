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
    public number = false;
    public lenght = false;
    public uppercase = false;
    public lowercase = false;
    public passwordConfirm = '';
    public passwordsMatch = true;
    public specialcase = false;
    public passwordInvalid = false;
    public accountExist = false;
    public eMailExist = false;
    public restrictedFeatures = false;

    public constructor(private readonly authService: AuthService, private readonly db: DbService) {}

    public async onRegister(): Promise<void> {
        this.passwordsMatch = this.password === this.passwordConfirm;
        if (!this.passwordsMatch || !this.specialcase || !this.lowercase || !this.uppercase || !this.number) {
            console.log('invalid passwort');
            this.passwordInvalid = true;
            return;
        } else {
            this.passwordInvalid = false;
        }

        const eMailAlreadyTaken = await this.db.docExists<Profile>(DbPaths.PROFILES, 'email', '==', this.email);

        const accountNameAlreadyTaken = await this.db.docExists<Profile>(
            DbPaths.PROFILES,
            'accountName',
            '==',
            this.accountName
        );

        if (!accountNameAlreadyTaken && !eMailAlreadyTaken) {
            this.accountExist = false;
            this.eMailExist = false;
            await this.authService.registerUser(this.email, this.password, this.accountName);
        } else if (accountNameAlreadyTaken && !eMailAlreadyTaken) {
            this.accountExist = true;
        } else if (!accountNameAlreadyTaken && eMailAlreadyTaken) {
            this.eMailExist = true;
        } else {
            console.error('Account already taken', this.accountName);
            this.accountExist = true;
            this.eMailExist = true;
        }
    }

    public onKey(): void {
        if (this.password.length > 7) {
            this.lenght = true;
        } else this.lenght = false;

        if (this.password.match('(?=.*[0-9])')) {
            this.number = true;
        } else this.number = false;

        if (this.password.match('(?=.*[A-Z])')) {
            this.uppercase = true;
        } else this.uppercase = false;

        if (this.password.match('(?=.*[a-z])')) {
            this.lowercase = true;
        } else this.lowercase = false;

        if (this.password.match('(?=.*\\W)')) {
            this.specialcase = true;
        } else this.specialcase = false;
    }

    public onKeyAccount(): void {
        if (this.accountName !== '') {
            this.restrictedFeatures = true;
        } else {
            this.restrictedFeatures = false;
        }
    }

    public async onLoginWithGoogle(): Promise<void> {
        await this.authService.loginWithGoogle();
    }
}
