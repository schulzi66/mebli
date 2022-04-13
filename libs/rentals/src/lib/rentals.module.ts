import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { RentalsComponent } from './components/rentals/rentals.component';

@NgModule({
    imports: [
        CommonModule,
        TranslocoModule,
        RouterModule.forChild([{ path: '', pathMatch: 'full', component: RentalsComponent }]),
    ],
    declarations: [RentalsComponent],
    exports: [RentalsComponent],
})
export class RentalsModule {}
