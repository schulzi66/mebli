import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { RentalRequest } from '../models/rental-request';
import { RentalService } from './../services/rental.service';

@Injectable({ providedIn: 'root' })
export class RentalRequestResolver implements Resolve<RentalRequest | undefined> {
    public constructor(private readonly rentalService: RentalService) {}

    public resolve(route: ActivatedRouteSnapshot): RentalRequest | undefined {
        return this.rentalService.rentalRequests.find((x) => x.pathId === route.params['id']);
    }
}
