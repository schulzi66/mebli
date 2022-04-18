import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarService } from '@mebli/nav';
import { OwnRelease } from '../../models/own-release';
import { ReleasesService } from '../../services/releases.service';

@Component({
    selector: 'mebli-edit-release',
    templateUrl: './edit-release.component.html',
    styleUrls: ['./edit-release.component.css'],
})
export class EditReleaseComponent implements OnInit {
    public ownRelease: OwnRelease | undefined;

    public constructor(
        public readonly releasesService: ReleasesService,
        private readonly navbarService: NavbarService,
        private readonly location: Location,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute
    ) {
        this.navbarService.resetActions();
        this.navbarService.registerActions([
            {
                order: -1,
                icon: 'back',
                translationKey: 'back',
                action: () => {
                    this.releasesService.queryUserReleases();
                    this.location.back()
                },
            },
            {
                order: 0,
                icon: 'home',
                translationKey: 'home',
                action: () => {
                    this.releasesService.queryUserReleases();
                    this.router.navigate(['/'])
                }
            },
            {
                order: 1,
                icon: 'check',
                translationKey: 'confirm',
                action: () => this.updateOwnRelease(),
            },
        ]);
    }

    public ngOnInit(): void {
        if (this.activatedRoute.snapshot.params['id'] === undefined) {
            this.location.back();
        }
        const uid: string = this.activatedRoute.snapshot.params['id'];

        this.ownRelease = this.releasesService.userReleases?.ownReleases.find(
            (release: OwnRelease) => release.uid === uid
        );

        if (this.ownRelease === undefined) {
            this.location.back();
        }
    }

    public updateOwnRelease(): void {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.releasesService.updateEditedUserReleases(this.ownRelease!);
        this.location.back();
    }
    
}
