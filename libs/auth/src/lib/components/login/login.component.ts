import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'mebli-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent {
    public email = '';
    public password = '';

    public constructor(private readonly authService: AuthService) {}

    public async onLogin(): Promise<void> {
        await this.authService.loginWithEmail(this.email, this.password);
    }

    public async onLoginWithGoogle(): Promise<void> {
        await this.authService.loginWithGoogle();
    }
}
