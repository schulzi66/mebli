import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

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

    public constructor(private readonly authService: AuthService) {}

    public async onRegister(): Promise<void> {
        this.passwordsMatch = this.password === this.passwordConfirm;
        if (this.passwordsMatch) {
            await this.authService.registerUser(this.email, this.password);
        }
    }

    public async onLoginWithGoogle(): Promise<void> {
        await this.authService.loginWithGoogle();
    }
}
