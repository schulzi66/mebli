import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { NavbarAction } from '../models/navbar-action';

@Injectable({
    providedIn: 'root',
})
export class NavbarService {
    private actions: NavbarAction[];

    public get navbarActions$(): Observable<NavbarAction[]> {
        return of(
            this.actions.sort((a, b) => a.order - b.order).filter((x) => x.validator === undefined || x.validator())
        );
    }

    public constructor(private readonly router: Router) {
        this.actions = [];
    }

    public registerActions(actions: NavbarAction[]): number {
        return this.actions.push(...actions);
    }

    public resetActions(): void {
        this.actions = [];
    }
}
