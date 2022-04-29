import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ImdbApiModule } from '@mebli/imdb-api';
import { TranslocoModule } from '@ngneat/transloco';
import { NgOverlayContainerModule } from 'ng-overlay-container';
import { AddManualComponent } from './components/add-manual/add-manual.component';
import { MediaDetailComponent } from './components/media-detail/media-detail.component';
import { MyLibraryComponent } from './components/my-library/my-library.component';
import { MediaDetailsResolver } from './resolvers/media-details.resolver';
import { MediaResolver } from './resolvers/media.resolver';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TranslocoModule,
        ImdbApiModule,
        NgOverlayContainerModule,
        RouterModule,
        RouterModule.forChild([
            {
                path: '',
                component: MyLibraryComponent,
            },
            {
                path: 'add/manual',
                component: AddManualComponent,
            },
            {
                path: 'add/details/:id',
                component: MediaDetailComponent,
                data: {
                    isNewMedia: true,
                },
                resolve: {
                    mediaDetails: MediaDetailsResolver,
                },
            },
            {
                path: 'details/:id',
                component: MediaDetailComponent,
                data: {
                    isNewMedia: false,
                },
                resolve: {
                    media: MediaResolver,
                },
            },
        ]),
    ],
    declarations: [MyLibraryComponent, AddManualComponent, MediaDetailComponent],
    exports: [MyLibraryComponent, AddManualComponent, MediaDetailComponent],
})
export class MyLibraryModule {}
