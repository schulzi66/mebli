import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@mebli/auth';
import { Media } from '@mebli/my-library';
import { NavbarService } from '@mebli/nav';
import { Release } from '@mebli/releases';
import { RentalRequest, RentalService } from '@mebli/rentals';

@Component({
    selector: 'mebli-request-media',
    templateUrl: './request-media.component.html',
    styleUrls: ['./request-media.component.css'],
})
export class RequestMediaComponent implements OnInit {
    public media: Media | undefined;
    public release: Release | undefined;
    public selectedSeasons: boolean[] = [];

    public constructor(
        private readonly location: Location,
        private readonly navbarService: NavbarService,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
        private readonly authService: AuthService,
        private readonly rentalService: RentalService
    ) {
        this.navbarService.registerActions([
            {
                order: -1,
                icon: 'back',
                translationKey: 'back',
                action: () => this.navigateBack(),
            },
            {
                order: 1,
                icon: 'mail',
                translationKey: 'request_media',
                action: () => this.requestMedia(),
            },
        ]);
    }

    public async ngOnInit(): Promise<void> {
        if (this.activatedRoute.snapshot.params['id'] === undefined) {
            this.navigateBack();
        }

        const foreignMedia: { release: Release; media: Media } = this.activatedRoute.snapshot.data['foreignMedia'];

        if (foreignMedia === undefined || foreignMedia.media === undefined || foreignMedia.release === undefined) {
            await this.navigateBack();
        }

        this.media = foreignMedia.media;
        this.release = foreignMedia.release;

        if (this.media.type === 'TVSeries') {
            this.media.tvSeriesInfo?.seasons?.forEach((_, i) => (this.selectedSeasons[i] = false));
        }
    }

    public async requestMedia(): Promise<void> {
        if (this.media && this.release && this.authService.uid) {
            const rentalRequest: RentalRequest = {
                ownerUid: this.release.uid,
                mediaId: this.media.id,
                mediaTitle: this.media.title,
                mediaPathId: this.media.pathId,
                mediaType: this.media.type,
                requesterId: this.authService.uid,
                requesterName: this.authService.accountName,
                blueray: this.media.blueray ?? false,
                ...(this.media.type === 'TVSeries' && { requestedSeasons: this.selectedSeasons }),
            };

            await this.rentalService.addRentalRequest(rentalRequest);
            this.navigateBack();
        }
    }

    private async navigateBack(): Promise<boolean> {
        return this.router.navigate(['./media-search']);
    }
}
