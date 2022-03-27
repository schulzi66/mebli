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

            // this.mediaSearch = {
            //     searchType: 'Movie',
            //     expression: 'Fluch der Karibik',
            //     results: [
            //         {
            //             id: 'tt0325980',
            //             resultType: 'Title',
            //             image: 'https://imdb-api.com/images/original/MV5BNGYyZGM5MGMtYTY2Ni00M2Y1LWIzNjQtYWUzM2VlNGVhMDNhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_Ratio0.7273_AL_.jpg',
            //             title: 'Pirates of the Caribbean: The Curse of the Black Pearl',
            //             description: '(2003) aka "Fluch der Karibik"',
            //         },
            //         {
            //             id: 'tt1790809',
            //             resultType: 'Title',
            //             image: 'https://imdb-api.com/images/original/MV5BMTYyMTcxNzc5M15BMl5BanBnXkFtZTgwOTg2ODE2MTI@._V1_Ratio0.7273_AL_.jpg',
            //             title: 'Pirates of the Caribbean: Dead Men Tell No Tales',
            //             description: '(2017) aka "Fluch der Karibik: Salazars Rache"',
            //         },
            //         {
            //             id: 'tt0383574',
            //             resultType: 'Title',
            //             image: 'https://imdb-api.com/images/original/MV5BMTcwODc1MTMxM15BMl5BanBnXkFtZTYwMDg1NzY3._V1_Ratio0.7273_AL_.jpg',
            //             title: "Pirates of the Caribbean: Dead Man's Chest",
            //             description: '(2006) aka "Pirates of the Caribbean - Fluch der Karibik 2"',
            //         },
            //         {
            //             id: 'tt0449088',
            //             resultType: 'Title',
            //             image: 'https://imdb-api.com/images/original/MV5BMjIyNjkxNzEyMl5BMl5BanBnXkFtZTYwMjc3MDE3._V1_Ratio0.7273_AL_.jpg',
            //             title: "Pirates of the Caribbean: At World's End",
            //             description: '(2007) aka "Fluch der Karibik - Am Ende der Welt"',
            //         },
            //         {
            //             id: 'tt1790810',
            //             resultType: 'Title',
            //             image: 'https://imdb-api.com/images/original/nopicture.jpg',
            //             title: 'Untitled Pirates of the Caribbean Project',
            //             description: '(in development) aka "Fluch der Karibik 6"',
            //         },
            //         {
            //             id: 'tt0492448',
            //             resultType: 'Title',
            //             image: 'https://imdb-api.com/images/original/MV5BMWUwZDZkNTMtYzY0Ni00MTgyLWI5MWEtOTlmYzI4MzlmZjYyXkEyXkFqcGdeQXVyNjM2NDIwMzQ@._V1_Ratio0.7273_AL_.jpg',
            //             title: 'Blackbeard: Terror at Sea',
            //             description: '(2006) (TV Movie) aka "Blackbeard - Der wahre Fluch der Karibik"',
            //         },
            //     ],
            //     errorMessage: '',
            // };
        }
    }

    public searchMediaDetails(id: string): Observable<MediaDetails> {
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
