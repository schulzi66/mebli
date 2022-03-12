import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReleasesComponent } from './components/releases/releases.component';

@NgModule({
    imports: [CommonModule, RouterModule.forChild([{ path: '', pathMatch: 'full', component: ReleasesComponent }])],
    declarations: [ReleasesComponent],
    exports: [ReleasesComponent],
})
export class ReleasesModule {}
