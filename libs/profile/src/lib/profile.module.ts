import { ProfileComponent } from './components/profile/profile.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [CommonModule, RouterModule.forChild([{ path: '', pathMatch: 'full', component: ProfileComponent }])],
    declarations: [ProfileComponent],
    exports: [ProfileComponent],
})
export class ProfileModule {}
