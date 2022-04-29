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
    public borrows: Rental[] = [];
    public rentalRequests: RentalRequest[] = [];
    public currentSelection: 'Lent' | 'Borrowed' | 'Requests' = 'Lent';

    public constructor(private readonly db: DbService, private readonly authService: AuthService) {
        this.queryRentals();
        this.queryBorrows();
        this.queryRentalRequests();
    }

    public queryRentals(): void {
        this.db
            .getDocs$<Rental>(DbPaths.RENTALS, 'ownerUid', '==', this.authService.uid, 'mediaTitle', 'asc')
            .subscribe((rentals: Rental[]) => {
                this.rentals = rentals;
            });
    }

    public queryBorrows(): void {
        this.db
            .getDocs$<Rental>(DbPaths.RENTALS, 'borrowerId', '==', this.authService.uid, 'mediaTitle', 'asc')
            .subscribe((borrows: Rental[]) => {
                this.borrows = borrows;
            });
    }

    public queryRentalRequests(): void {
        this.db
            .getDocs$<RentalRequest>(
                DbPaths.RENTAL_REQUESTS,
                'ownerUid',
                '==',
                this.authService.uid,
                'mediaTitle',
                'asc'
            )
            .subscribe((rentalRequests: RentalRequest[]) => {
                this.rentalRequests = rentalRequests;
            });
    }

    public async addRental(rental: Rental | undefined): Promise<void> {
        if (rental && rental.ownerUid && rental.borrowerName) {
            rental.pathId = this.db.generateId();
            return this.db.setDoc<Rental>(DbPaths.RENTALS, rental.pathId, rental);
        }
    }

    public async updateRental(rental: Rental | undefined): Promise<void> {
        if (rental && rental.ownerUid && rental.borrowerName && rental.pathId) {            
            return this.db.updateDocument<Rental>(DbPaths.RENTALS, rental.pathId, rental);
        }
    }

    public async returnRental(rental: Rental | undefined): Promise<void> {
        if (rental && rental.mediaPathId && rental.pathId) {            
            // TODO Marius Medien als ausgeliehen markieren bzw. zurück gegeben machen
            return this.db.deleteDocument<Rental>(DbPaths.RENTALS, rental.pathId);
        }
    }

    public async addRentalRequest(rentalRequest: RentalRequest): Promise<void> {
        if (rentalRequest) {
            rentalRequest.pathId = this.db.generateId();
            return this.db.setDoc<RentalRequest>(DbPaths.RENTAL_REQUESTS, rentalRequest.pathId, rentalRequest);
        }
    }

    public async removeRentalRequest(rentalRequest: RentalRequest | undefined): Promise<void> {
        if (rentalRequest && rentalRequest.pathId) {
            return this.db.deleteDocument(DbPaths.RENTAL_REQUESTS, rentalRequest.pathId);
        }
    }

    public switchSelection(selection: 'Lent' | 'Borrowed' | 'Requests'): void {
        this.currentSelection = selection;
    }

    public constructFormatedDate(): string {
        const today = new Date();
        return [today.getFullYear(), this.padTo2Digits(today.getMonth() + 1), this.padTo2Digits(today.getDate())].join(
            '-'
        );
    }

    private padTo2Digits(num: number) {
        return num.toString().padStart(2, '0');
    }
}
