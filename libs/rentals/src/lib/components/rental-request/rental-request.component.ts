import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavbarService } from '@mebli/nav';
import { Rental } from '../../models/rental';
import { RentalService } from '../../services/rental.service';
import { RentalRequest } from './../../models/rental-request';

@Component({
    selector: 'mebli-rental-request',
    templateUrl: './rental-request.component.html',
    styleUrls: ['./rental-request.component.css'],
})
export class RentalRequestComponent implements OnInit {
    public rentalRequest: RentalRequest | undefined;
    public rental: Rental | undefined;

    public constructor(
        private readonly navbarService: NavbarService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly location: Location,
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
                icon: 'decline',
                translationKey: 'decline',
                action: async () => {
                    await this.rentalService.removeRentalRequest(this.rentalRequest);
                    this.navigateBack();
                },
            },
            {
                order: 2,
                icon: 'check',
                translationKey: 'confirm',
                action: async () => {
                    await this.rentalService.addRental(this.rental);
                    await this.rentalService.removeRentalRequest(this.rentalRequest);
                    this.navigateBack();
                },
            },
        ]);
    }

    public ngOnInit(): void {
        if (this.activatedRoute.snapshot.params['id'] === undefined) {
            this.navigateBack();
        }

        this.rentalRequest = this.activatedRoute.snapshot.data['request'];

        if (this.rentalRequest === undefined) {
            this.navigateBack();
        } else {
            this.rental = {
                blueray: this.rentalRequest.blueray,
                fskRating: this.rentalRequest.fskRating,
                borrowerId: this.rentalRequest.requesterId,
                borrowerName: this.rentalRequest.requesterName,
                lendingDate: this.rentalService.constructFormatedDate(),
                mediaContentRating: this.rentalRequest.mediaContentRating,
                mediaGenres: this.rentalRequest.mediaGenres,
                mediaId: this.rentalRequest.mediaId,
                mediaImage: this.rentalRequest.mediaImage,
                mediaPathId: this.rentalRequest.mediaPathId,
                mediaPlot: this.rentalRequest.mediaPlot,
                mediaPlotLocal: this.rentalRequest.mediaPlotLocal,
                mediaStars: this.rentalRequest.mediaStars,
                mediaTitle: this.rentalRequest.mediaTitle,
                mediaType: this.rentalRequest.mediaType,
                mediaYear: this.rentalRequest.mediaYear,
                ownerName: this.rentalRequest?.ownerName,
                ownerUid: this.rentalRequest?.ownerUid,
                ...(this.rentalRequest.mediaType === 'TVSeries' && {
                    lentSeasons: this.rentalRequest.requestedSeasons,
                }),
            };
        }
    }

    private navigateBack(): void {
        this.location.back();
    }
}
