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
            ownerUid: this.authService.uid,
            ownerName: this.authService.accountName,
            mediaId: this.media.id,
            mediaTitle: this.media.title,
            mediaPathId: this.media.pathId,
            mediaType: this.media.type,
            mediaImage: this.media.image,
            mediaStars: this.media.stars,
            mediaGenres: this.media.genres,
            mediaYear: this.media.year,
            mediaContentRating: this.media.contentRating,
            mediaPlot: this.media.plot,
            mediaPlotLocal: this.media.plotLocal,
            borrowerName: '',
            lendingDate: this.rentalService.constructFormatedDate(),
            blueray: this.media.blueray ?? false,
            // TODO Andi: lentSeasons befüllen für die die ausgewählt wurden
        };
    }

    private async lend(): Promise<void> {
        await this.rentalService.addRental(this.rental);
        this.router.navigate(['/rentals']);
    }
}
