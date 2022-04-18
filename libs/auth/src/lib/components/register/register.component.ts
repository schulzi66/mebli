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
    public PasswordInvalid=false;
    
    public constructor(private readonly authService: AuthService, private readonly db: DbService) {}

    public async onRegister(): Promise<void> {
        this.passwordsMatch = this.password === this.passwordConfirm;
        if (!this.passwordsMatch || !this.specialcase || !this.lowercase || !this.uppercase || !this.number) {
            console.log("invalid passwort")
            this.PasswordInvalid=true;
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

   
    public onKey(): void  {
        if (this.password.length>7)
    {
        this.lenght=true; 
    }
    else  this.lenght=false; 
     if(this.password.match("(?=.*[0-9])"))
    {
        this.number=true;
    }
    else this.number=false;

    if(this.password.match("(?=.*[A-Z])"))
    {
        this.uppercase=true;
    }
    else this.uppercase=false;

    if(this.password.match("(?=.*[a-z])"))
    {
        this.lowercase=true;
    }
    else this.lowercase=false;


    if(this.password.match("(?=.*\\W)"))
    {
        this.specialcase=true;
    }
    else this.specialcase=false;
    
    }
    

  

    public async onLoginWithGoogle(): Promise<void> {
        await this.authService.loginWithGoogle();
    }
}
