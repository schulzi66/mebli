import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImdbApiModule } from '../imdb-api.module';
import { IMBD_API } from '../models/imdb-api';
import { ImdbApiActions } from '../models/imdb-api-actions';
import { IMBD_API_KEY } from '../models/imdb-api-key';
import { MediaDetails } from '../models/media-details';
import { MediaSearch } from '../models/media-search';

@Injectable({
    providedIn: ImdbApiModule,
})
export class ImdbApiService {
    public constructor(
        @Inject(IMBD_API) private readonly api: string,
        @Inject(IMBD_API_KEY) private readonly apiKey: string,
        private readonly http: HttpClient
    ) {}

    public getMediaByTitle(title: string): Observable<MediaSearch> {
        return this.http.get<MediaSearch>(`${this.api}/${ImdbApiActions.SEARCH}/${this.apiKey}/${encodeURI(title)}`);
    }

    public getMediaDetails(id: string): Observable<MediaDetails> {
        return this.http.get<MediaDetails>(`${this.api}/de/${ImdbApiActions.DETAILS}/${this.apiKey}/${id}`);
    }
}
