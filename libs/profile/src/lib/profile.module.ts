import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { NgOverlayContainerModule } from 'ng-overlay-container';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
    imports: [
        CommonModule,
        TranslocoModule,
        FormsModule,
        NgOverlayContainerModule,
        RouterModule.forChild([{ path: '', pathMatch: 'full', component: ProfileComponent }]),
    ],
    declarations: [ProfileComponent],
    exports: [ProfileComponent],
})
export class ProfileModule {}
