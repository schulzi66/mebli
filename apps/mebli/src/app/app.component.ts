import { Component } from '@angular/core';
import { AuthService } from '@mebli/auth';

@Component({
    selector: 'mebli-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    title = 'mebli';

    public constructor(public readonly authService: AuthService) {}
}
