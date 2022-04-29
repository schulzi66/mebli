import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavbarService } from '@mebli/nav';
import { Rental } from '../../models/rental';
import { RentalService } from '../../services/rental.service';

@Component({
    selector: 'mebli-borrowed-details',
    templateUrl: './borrowed-details.component.html',
    styleUrls: ['./borrowed-details.component.css'],
})
export class BorrowedDetailsComponent implements OnInit {
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
                icon: 'done',
                translationKey: 'save',
                action: async () => {
                    await this.rentalService.updateRental(this.rental);
                    this.navigateBack();
                },
            },
        ]);
    }

    public ngOnInit(): void {
        if (this.activatedRoute.snapshot.params['id'] === undefined) {
            this.navigateBack();
        }

        this.rental = this.activatedRoute.snapshot.data['rental'];

        if (this.rental === undefined) {
            this.navigateBack();
        }
    }

    private navigateBack(): void {
        this.location.back();
    }
}
