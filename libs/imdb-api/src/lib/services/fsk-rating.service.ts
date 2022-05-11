import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImdbApiModule } from '../imdb-api.module';

@Injectable({
    providedIn: ImdbApiModule,
})
export class FskRatingService {
    public constructor(private readonly http: HttpClient) {}

    public getFsk(imdbId: string): Observable<number> {
        return this.http.get<number>(`/api2/s/${imdbId}/de`);
    }
}
