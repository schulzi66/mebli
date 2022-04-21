import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { MediaSearchComponent } from './components/media-search/media-search.component';
import { RequestMediaComponent } from './components/request-media/request-media.component';
import { ForeignMediaReleaseResolver } from './resolver/foreign-media-release.resolver';

@NgModule({
    imports: [
        CommonModule,
        TranslocoModule,
        FormsModule,
        RouterModule.forChild([
            { path: '', pathMatch: 'full', component: MediaSearchComponent },
            { path: 'request/:id', component: RequestMediaComponent, resolve: { foreignMedia: ForeignMediaReleaseResolver } },
        ]),
    ],
    declarations: [MediaSearchComponent, RequestMediaComponent],
    exports: [MediaSearchComponent, RequestMediaComponent],
})
export class MediaSearchModule {}
