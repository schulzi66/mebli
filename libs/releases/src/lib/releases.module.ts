import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { AddReleaseComponent } from './components/add-release/add-release.component';
import { EditReleaseComponent } from './components/edit-release/edit-release.component';
import { ReleasesComponent } from './components/releases/releases.component';

@NgModule({
    imports: [
        CommonModule,
        TranslocoModule,
        FormsModule,
        RouterModule.forChild([
            { path: '', pathMatch: 'full', component: ReleasesComponent },
            { path: 'add', component: AddReleaseComponent },
            { path: 'edit/:id', component: EditReleaseComponent },
        ]),
    ],
    declarations: [ReleasesComponent, AddReleaseComponent, EditReleaseComponent],
    exports: [ReleasesComponent, AddReleaseComponent, EditReleaseComponent],
})
export class ReleasesModule {}
