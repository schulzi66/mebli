import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { User } from 'firebase/auth';
import { Observable, map } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    public constructor(private readonly authService: AuthService, private readonly router: Router) {}

    public canActivate(
        _route: ActivatedRouteSnapshot,
        _state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.authService.user$.pipe(
            map((user: User | null) => {
                if (user) {
                    return true;
                } else {
                    this.router.navigate(['./login']);
                    return false;
                }
            })
        );
    }
}
