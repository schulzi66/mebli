import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { User } from '../../models/user';
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
        return this.authService.userAuth$.pipe(
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
