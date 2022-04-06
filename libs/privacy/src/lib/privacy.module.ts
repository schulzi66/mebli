import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrivacyComponent } from './components/privacy/privacy.component';

@NgModule({
    imports: [CommonModule, RouterModule.forChild([{ path: '', pathMatch: 'full', component: PrivacyComponent }])],
})
export class PrivacyModule {}
