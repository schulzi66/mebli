import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IMBD_API } from './models/imdb-api';
import { IMBD_API_KEY } from './models/imdb-api-key';

@NgModule({
    imports: [CommonModule],
    providers: [
        {
            provide: IMBD_API,
            useValue: 'https://imdb-api.com',
        },
        {
            provide: IMBD_API_KEY,
            useValue: 'k_1ootjkg5',
        },
    ],
})
export class ImdbApiModule {}
