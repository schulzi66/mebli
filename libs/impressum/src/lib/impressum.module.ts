import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImpressumComponent } from './components/impressum/impressum.component';

@NgModule({
    imports: [CommonModule, RouterModule.forChild([{ path: '', pathMatch: 'full', component: ImpressumComponent }])],
    declarations: [ImpressumComponent],
    exports: [ImpressumComponent],
})
export class ImpressumModule {}
