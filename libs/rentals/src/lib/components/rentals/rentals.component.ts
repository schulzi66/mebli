import { Component } from '@angular/core';
import { RentalService } from '../../services/rental.service';

@Component({
    selector: 'mebli-rentals',
    templateUrl: './rentals.component.html',
    styleUrls: ['./rentals.component.css'],
})
export class RentalsComponent {
    public constructor(public readonly rentalService: RentalService) {}
}
