import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Rental } from '../models/rental';
import { RentalService } from './../services/rental.service';

@Injectable({ providedIn: 'root' })
export class BorrowsResolver implements Resolve<Rental | undefined> {
    public constructor(private readonly rentalService: RentalService) {}

    public resolve(route: ActivatedRouteSnapshot): Rental | undefined {
        return this.rentalService.borrows.find((x) => x.pathId === route.params['id']);
    }
}
