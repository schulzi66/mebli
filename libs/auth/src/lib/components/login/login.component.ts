import { Component } from '@angular/core';
import { DefaultFallbackStrategy } from '@ngneat/transloco';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'mebli-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent {
    public email = '';
    public password = '';
    public wrongPassword = false;
    public wrongEmail = false;
    public tooManyRequests = false;
    public invalidEmail = false;

    public constructor(private readonly authService: AuthService) {}

    public async onLogin(): Promise<void> {
        this.wrongPassword = false;
        this.wrongEmail = false;
        this.tooManyRequests = false;
        this.invalidEmail = false;
        const loginResult = await this.authService.loginWithEmail(this.email, this.password);

        if(loginResult == 'auth/wrong-password'){          
            this.wrongPassword = true;
        };
        if(loginResult == 'auth/user-not-found'){          
            this.wrongEmail = true;
        };
        if(loginResult == 'auth/too-many-requests'){          
            this.tooManyRequests = true;
        };
        if(loginResult == 'auth/invalid-email'){          
            this.invalidEmail = true;
        };
        
        
        
    }

    public async onLoginWithGoogle(): Promise<void> {
        await this.authService.loginWithGoogle();
    }
}
