import { Injectable } from '@angular/core';
import { ImdbApiService, MediaDetails, MediaSearch } from '@mebli/imdb-api';
import { Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AddManualService {
    public term = '';
    public mediaSearch: MediaSearch | undefined;
    public mediaDetailsBuffer: MediaDetails[] = [];

    public constructor(private readonly imdbApiService: ImdbApiService) {}

    public searchMedia(): void {
        if (this.term !== '') {
            this.imdbApiService.getMediaByTitle(this.term).subscribe((results: MediaSearch) => {
                this.mediaSearch = results;
            });
        }
    }

    public searchMediaDetails(id: string): Observable<MediaDetails> {
        return this.imdbApiService.getMediaDetails(id).pipe(
            tap((details: MediaDetails) => {
                if (!this.mediaDetailsBuffer.includes(details)) {
                    this.mediaDetailsBuffer.push(details);
                }
            })
        );
    }
}
