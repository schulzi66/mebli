import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from '@mebli/nav';
import { MediaSearchService } from '../../services/media-search.service';

@Component({
    selector: 'mebli-add-manual',
    templateUrl: './add-manual.component.html',
    styleUrls: ['./add-manual.component.css'],
})
export class AddManualComponent {
    public constructor(
        private readonly navbarService: NavbarService,
        private readonly router: Router,
        public readonly mediaSearchService: MediaSearchService
    ) {
        this.navbarService.registerActions([
            {
                order: -1,
                icon: 'back',
                translationKey: 'back',
                action: () => this.router.navigate(['/library']),
            },
            {
                order: 1,
                icon: 'search',
                translationKey: 'search',
                action: () => this.mediaSearchService.searchMedia(),
            },
        ]);

        // this.movieSearch = {
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
