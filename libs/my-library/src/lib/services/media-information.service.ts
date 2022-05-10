import { Injectable } from '@angular/core';
import { DbPaths, DbService } from '@mebli/db';
import { ImdbApiService, MediaDetails, MediaSearch, MediaSearchResult } from '@mebli/imdb-api';
import { Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MediaInformationService {
    public term = '';
    public mediaSearch: MediaSearch | undefined;
    public mediaDetailsBuffer: MediaDetails[] = [];

    public constructor(private readonly imdbApiService: ImdbApiService, private readonly db: DbService) {}

    public searchMedia(): void {
        if (this.term !== '') {
            this.imdbApiService.getMediaByTitle(this.term).subscribe((mediaSearch: MediaSearch) => {
                this.mediaSearch = mediaSearch;

                if (mediaSearch.results) {
                    mediaSearch.results.forEach((searchResult: MediaSearchResult) => {
                        this.db.setDoc(DbPaths.SEARCH, searchResult.id, searchResult, { merge: true });
                    });
                } else {
                    console.error('Service currently unavailable');
                    console.error(mediaSearch.errorMessage);
                }
            });
        }
    }

    public searchMediaDetails(id: string): Observable<MediaDetails> {
        console.log("Test");
        return this.imdbApiService.getMediaDetails(id).pipe(
            tap((details: MediaDetails) => {
                this.mediaSearch?.results.map((result) => {
                    if (details.id === result.id) {
                        details.description = result.description;
                    }
                });

                if (!this.mediaDetailsBuffer.includes(details)) {
                    this.mediaDetailsBuffer.push(details);
                    
                }
            })
        );
    }
}
