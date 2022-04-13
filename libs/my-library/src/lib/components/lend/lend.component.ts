import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@mebli/auth';
import { NavbarService } from '@mebli/nav';
import { Rental, RentalService } from '@mebli/rentals';
import { Media } from '../../models/media';

@Component({
    selector: 'mebli-lend',
    templateUrl: './lend.component.html',
    styleUrls: ['./lend.component.css'],
})
export class LendComponent implements OnInit {
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
            uid: this.authService.uid,
            mediaId: this.media.id,
            mediaPathId: this.media.pathId,
            mediaTitle: this.media.title,
            mediaType: this.media.type,
            borrowerName: '',
            lendingDate: this.constructFormatedDate(),
            blueray: this.media.blueray ?? false,
        };
    }

    private constructFormatedDate(): string {
        const today = new Date();
        return [today.getFullYear(), this.padTo2Digits(today.getMonth() + 1), this.padTo2Digits(today.getDate())].join(
            '-'
        );
    }

    private padTo2Digits(num: number) {
        return num.toString().padStart(2, '0');
    }

    private async lend(): Promise<void> {
        await this.rentalService.addRental(this.rental);
        this.router.navigate(['/rentals']);
    }
}
