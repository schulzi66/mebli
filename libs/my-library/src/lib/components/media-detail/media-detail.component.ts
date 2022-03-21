import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@mebli/auth';
import { DbPaths, DbService } from '@mebli/db';
import { MediaDetails } from '@mebli/imdb-api';
import { NavbarService } from '@mebli/nav';
import { Media } from '../../models/media';

@Component({
    selector: 'mebli-media-detail',
    templateUrl: './media-detail.component.html',
    styleUrls: ['./media-detail.component.css'],
})
export class MediaDetailComponent implements OnInit {
    public mediaDetails: MediaDetails | Media | undefined;

    public constructor(
        private readonly router: Router,
        private readonly location: Location,
        private readonly navbarService: NavbarService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly db: DbService,
        private readonly authService: AuthService
    ) {}

    public ngOnInit(): void {
        if (this.activatedRoute.snapshot.params['id'] === undefined) {
            this.navigateBack();
        }

        this.registerActions(this.activatedRoute.snapshot.data['isNewMedia']);

        this.mediaDetails = this.activatedRoute.snapshot.data['isNewMedia']
            ? (this.activatedRoute.snapshot.data['mediaDetails'] as MediaDetails)
            : (this.activatedRoute.snapshot.data['media'] as Media);

        console.log(this.mediaDetails);
    }

    private addToLibrary(): void {
        if (this.mediaDetails && this.authService.uid) {
            const media: Media = Object.assign({ uid: this.authService.uid }, this.mediaDetails);

            this.db
                .setDoc<MediaDetails>(DbPaths.MEDIA, undefined, media)
                .then(() => this.router.navigate(['/library']));
        }
    }

    private navigateBack(): void {
        this.location.back();
    }

    private registerActions(isNewMedia: boolean | undefined): void {
        isNewMedia
            ? this.navbarService.registerActions([
                  {
                      order: -1,
                      icon: 'back',
                      translationKey: 'back',
                      action: () => this.navigateBack(),
                  },
                  {
                      order: 1,
                      icon: 'add',
                      translationKey: 'add',
                      action: () => this.addToLibrary(),
                  },
              ])
            : this.navbarService.registerActions([
                  {
                      order: -1,
                      icon: 'back',
                      translationKey: 'back',
                      action: () => this.navigateBack(),
                  },
              ]); // Todo register actions for existing items
    }
}
