import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@mebli/auth';
import { Media } from '@mebli/my-library';
import { NavbarService } from '@mebli/nav';
import { Rental } from '../../models/rental';
import { RentalService } from '../../services/rental.service';

@Component({
    selector: 'mebli-manual-lend',
    templateUrl: './manual-lend.component.html',
    styleUrls: ['./manual-lend.component.css'],
})
export class ManualLendComponent implements OnInit {
    public media: Media | undefined;
    public rental: Rental | undefined;

    public constructor(
        private readonly navbarService: NavbarService,
        private readonly location: Location,
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
                action: () => this.router.navigate(['/library']),
            },
            {
                order: 1,
                icon: 'check',
                translationKey: 'confirm',
                action: () => this.lend(),
            },
        ]);
    }

    public ngOnInit(): void {
        if (
            this.activatedRoute.snapshot.params['id'] === undefined ||
            this.activatedRoute.snapshot.data['media'] === undefined
        ) {
            this.location.back();
        }

        this.media = this.activatedRoute.snapshot.data['media'] as Media;
        this.rental = {
            blueray: this.media.blueray ?? false,
            fskRating: this.media.fskRating ?? '',
            borrowerName: '',
            lendingDate: this.rentalService.constructFormatedDate(),
            mediaContentRating: this.media.contentRating,
            mediaGenres: this.media.genres,
            mediaId: this.media.id,
            mediaImage: this.media.image,
            mediaPathId: this.media.pathId,
            mediaPlot: this.media.plot,
            mediaPlotLocal: this.media.plotLocal,
            mediaStars: this.media.stars,
            mediaTitle: this.media.title,
            mediaType: this.media.type,
            mediaYear: this.media.year,
            ownerName: this.authService.accountName,
            ownerUid: this.authService.uid,
            // TODO Andi: lentSeasons befüllen für die die ausgewählt wurden
        };
    }

    private async lend(): Promise<void> {
        await this.rentalService.addRental(this.rental);
        this.router.navigate(['/rentals']);
    }
}
