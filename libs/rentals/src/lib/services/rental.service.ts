import { Injectable } from '@angular/core';
import { AuthService } from '@mebli/auth';
import { DbPaths, DbService } from '@mebli/db';
import { Rental } from '../models/rental';
import { RentalRequest } from './../models/rental-request';

@Injectable({
    providedIn: 'root',
})
export class RentalService {
    public rentals: Rental[] = [];

    public constructor(private readonly db: DbService, private readonly authService: AuthService) {
        this.queryRentals();
    }

    public queryRentals(): void {
        this.db
            .getDocs$<Rental>(DbPaths.RENTALS, 'uid', '==', this.authService.uid, 'mediaTitle', 'asc')
            .subscribe((rentals: Rental[]) => {
                this.rentals = rentals;
            });
    }

    public async addRental(rental: Rental | undefined): Promise<void> {
        if (rental && rental.uid && rental.borrowerName) {
            return this.db.setDoc<Rental>(DbPaths.RENTALS, this.db.generateId(), rental);
        }
    }

    public async addRentalRequest(rentalRequest: RentalRequest): Promise<void> {
        if (rentalRequest) {
            return this.db.setDoc<RentalRequest>(DbPaths.RENTAL_REQUESTS, this.db.generateId(), rentalRequest);
        }
    }
}
