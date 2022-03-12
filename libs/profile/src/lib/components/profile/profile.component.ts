import { Component } from '@angular/core';
import { AuthService } from '@mebli/auth';

@Component({
    selector: 'mebli-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
    public constructor(public readonly authService: AuthService) {}
}
