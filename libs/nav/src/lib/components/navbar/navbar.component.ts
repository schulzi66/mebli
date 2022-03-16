import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import { NavbarService } from '../../services/navbar.service';

@Component({
    selector: 'mebli-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
    public shown = false;

    public constructor(private readonly router: Router, public readonly navbarService: NavbarService) {
        this.router.events.pipe(filter((event) => event instanceof NavigationStart)).subscribe((event: any) => {
            event.url !== '/' && event.url !== '/register' && event.url !== '/login'
                ? (this.shown = true)
                : (this.shown = false);

            this.navbarService.resetActions();
            this.navbarService.registerActions([
                {
                    order: 0,
                    icon: 'home',
                    translationKey: 'home',
                    action: () => this.router.navigate(['/']),
                }, 
            ]);
        });
    }
}
