import { Injectable } from '@angular/core';
import { DbPaths, DbService } from '@mebli/db';
import { ImdbApiService, MediaDetails, MediaSearch, MediaSearchResult } from '@mebli/imdb-api';
import { Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MediaSearchService {
    public term = '';
    public mediaSearch: MediaSearch | undefined;
    public mediaDetailsBuffer: MediaDetails[] = [];

    public constructor(private readonly imdbApiService: ImdbApiService, private readonly db: DbService) {}

    public searchMedia(): void {
        if (this.term !== '') {
            // this.db.getDocs$<MediaSearchResult>(DbPaths.SEARCH, 'description', '<=', this.term).subscribe(
            //     (mediaSearchResult: MediaSearchResult[]) =>
            //         (this.mediaSearch = {
            //             searchType: 'Manual',
            //             expression: this.term,
            //             errorMessage: '',
            //             results: mediaSearchResult,
            //         })
            // );

            this.imdbApiService.getMediaByTitle(this.term).subscribe((mediaSearch: MediaSearch) => {
                this.mediaSearch = mediaSearch;

                mediaSearch.results.forEach((searchResult: MediaSearchResult) => {
                    this.db.setDoc(DbPaths.SEARCH, searchResult.id, searchResult, { merge: true });
                });
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
