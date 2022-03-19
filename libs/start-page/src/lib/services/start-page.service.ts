import { Injectable } from '@angular/core';
import { AuthService } from '@mebli/auth';

@Injectable({
    providedIn: 'root',
})
export class StartPageService {
    public hasAccountName = false;

    public constructor(private readonly authService: AuthService) {
        this.authService.profile$.subscribe((profile) => {
            this.hasAccountName = !!profile?.accountName;
        });
    }
}
