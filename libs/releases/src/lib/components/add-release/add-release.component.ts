import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from '@mebli/auth';
import { NavbarService } from '@mebli/nav';
import { OwnRelease } from '../../models/own-release';
import { ReleasesService } from '../../services/releases.service';

@Component({
    selector: 'mebli-add-release',
    templateUrl: './add-release.component.html',
    styleUrls: ['./add-release.component.css'],
})
export class AddReleaseComponent {
    public ownRelease: OwnRelease;
    public accountFound: boolean | undefined;
    private foundProfile: Profile | undefined;

    public constructor(
        public readonly releasesService: ReleasesService,
        private readonly navbarService: NavbarService,
        private readonly router: Router,
        private readonly location: Location
    ) {
        this.ownRelease = {
            accountName: '',
        };
        this.registerActions();
    }

    public createNewRelease(): void {
        if (this.foundProfile && this.foundProfile.accountName) {
            this.ownRelease.accountName = this.foundProfile.accountName;
            this.ownRelease.uid = this.foundProfile.uid;
            this.releasesService.addOwnRelease(this.ownRelease);
            this.location.back();
        }
    }

    public async searchAccountName(): Promise<void> {
        this.foundProfile = undefined;
        this.foundProfile = await this.releasesService.searchAccountName(this.ownRelease.accountName);
        this.accountFound = !!this.foundProfile;
        this.registerActions();
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public clearSearch(event: any): void {
        // Clear Button Event has no inputType
        if (!event.inputType) {
            this.foundProfile = undefined;
            this.accountFound = undefined;
            this.registerActions();
        }
    }

    private registerActions(): void {
        this.navbarService.resetActions();
        if (this.accountFound) {
            this.navbarService.registerActions([
                {
                    order: -1,
                    icon: 'back',
                    translationKey: 'back',
                    action: () => this.location.back(),
                },
                {
                    order: 0,
                    icon: 'home',
                    translationKey: 'home',
                    action: () => this.router.navigate(['/']),
                },
                {
                    order: 1,
                    icon: 'check',
                    translationKey: 'confirm',
                    action: () => this.createNewRelease(),
                },
            ]);
        } else {
            this.navbarService.registerActions([
                {
                    order: -1,
                    icon: 'back',
                    translationKey: 'back',
                    action: () => this.location.back(),
                },
                {
                    order: 0,
                    icon: 'home',
                    translationKey: 'home',
                    action: () => this.router.navigate(['/']),
                },
                {
                    order: 1,
                    icon: 'search',
                    translationKey: 'search',
                    action: () => this.searchAccountName(),
                },
            ]);
        }
    }
}
