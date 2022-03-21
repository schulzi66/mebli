import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IMBD_API } from './models/imdb-api';
import { IMBD_API_KEY } from './models/imdb-api-key';

@NgModule({
    imports: [CommonModule],
    providers: [
        // ImdbApiService,
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

// https://imdb-api.com/de/API/Title/k_1ootjkg5/tt0325980

// https://imdb-api.com/API/SearchMovie/k_1ootjkg5/Fluch Der Karibik