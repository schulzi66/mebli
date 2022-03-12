import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MediaSearchComponent } from './components/media-search/media-search.component';

@NgModule({
    imports: [CommonModule, RouterModule.forChild([{ path: '', pathMatch: 'full', component: MediaSearchComponent }])],
    declarations: [MediaSearchComponent],
    exports: [MediaSearchComponent],
})
export class MediaSearchModule {}
