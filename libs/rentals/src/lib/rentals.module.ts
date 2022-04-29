import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MediaResolver } from '@mebli/my-library';
import { TranslocoModule } from '@ngneat/transloco';
import { BorrowedDetailsComponent } from './components/borrowed-details/borrowed-details.component';
import { LentDetailsComponent } from './components/lent-details/lent-details.component';
import { ManualLendComponent } from './components/manual-lend/manual-lend.component';
import { RentalRequestComponent } from './components/rental-request/rental-request.component';
import { RentalsComponent } from './components/rentals/rentals.component';
import { BorrowsResolver } from './resolver/borrows-resover';
import { RentalRequestResolver } from './resolver/rental-request.resolver';
import { RentalResolver } from './resolver/rental.resolver';

@NgModule({
    imports: [
        CommonModule,
        TranslocoModule,
        FormsModule,
        RouterModule.forChild([
            { path: '', pathMatch: 'full', component: RentalsComponent },
            {
                path: 'manual-lend/:id',
                component: ManualLendComponent,
                resolve: {
                    media: MediaResolver,
                },
            },
            {
                path: 'lent/details/:id',
                component: LentDetailsComponent,
                resolve: {
                    rental: RentalResolver
                }
            },
            {
                path: 'borrowed/details/:id',
                component: BorrowedDetailsComponent,
                resolve: {
                    rental: BorrowsResolver
                }
            },
            {
                path: 'request/:id',
                component: RentalRequestComponent,
                resolve: {
                    request: RentalRequestResolver,
                },
            },
        ]),
    ],
    declarations: [ManualLendComponent, RentalsComponent, RentalRequestComponent, LentDetailsComponent, BorrowedDetailsComponent],
    exports: [ManualLendComponent, RentalsComponent, RentalRequestComponent, LentDetailsComponent, BorrowedDetailsComponent],
})
export class RentalsModule {}
