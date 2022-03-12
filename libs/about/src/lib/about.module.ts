import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';

@NgModule({
    imports: [CommonModule, RouterModule.forChild([{ path: '', pathMatch: 'full', component: AboutComponent }])],
    declarations: [AboutComponent],
    exports: [AboutComponent],
})
export class AboutModule {}
