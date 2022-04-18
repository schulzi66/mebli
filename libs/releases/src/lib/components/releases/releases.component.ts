import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from '@mebli/nav';
import { OwnRelease } from '../../models/own-release';
import { Release } from '../../models/release';
import { ReleaseSelection } from '../../models/releaseSelection';
import { ReleasesService } from './../../services/releases.service';

@Component({
    selector: 'mebli-releases',
    templateUrl: './releases.component.html',
    styleUrls: ['./releases.component.css'],
})
export class ReleasesComponent {
    public constructor(
        public readonly releasesService: ReleasesService,
        private readonly navbarService: NavbarService,
        private readonly router: Router
    ) {
        this.registerActions();
    }

    public switchSelection(selection: ReleaseSelection): void {
        this.releasesService.switchSelection(selection);
        this.registerActions();
    }
    public removeForeignRelease(release: Release): void {
        this.releasesService.removeForeignRelease(release);
    }

    public editOwnRelease(ownRelease: OwnRelease): void {
        this.router.navigate(['./releases/edit', ownRelease.uid]);
    }

    public removeOwnRelease(ownRelease: OwnRelease): void {
        this.releasesService.removeOwnRelease(ownRelease);
    }

    private registerActions(): void {
        this.navbarService.resetActions();
        if (this.releasesService.currentSelection === 'Foreign') {
            this.navbarService.registerActions([
                {
                    order: 0,
                    icon: 'home',
                    translationKey: 'home',
                    action: () => this.router.navigate(['/']),
                },
            ]);
        } else {
            this.navbarService.registerActions([
                {
                    order: 0,
                    icon: 'home',
                    translationKey: 'home',
                    action: () => this.router.navigate(['/']),
                },
                {
                    order: 1,
                    icon: 'add',
                    translationKey: 'add',
                    action: () => this.router.navigate(['./releases/add']),
                },
            ]);
        }
    }
}
