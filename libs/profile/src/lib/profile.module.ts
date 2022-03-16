import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
    imports: [CommonModule, RouterModule.forChild([{ path: '', pathMatch: 'full', component: ProfileComponent }])],
    declarations: [ProfileComponent],
    exports: [ProfileComponent],
})
export class ProfileModule {}
