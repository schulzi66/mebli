import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImdbApiService, MediaDetails, MediaSearchResult } from '@mebli/imdb-api';
import { NavbarService } from '@mebli/nav';
import { firstValueFrom } from 'rxjs';
import { MediaSearchService } from '../../services/media-search.service';
import { MyLibraryService } from '../../services/my-library.service';

@Component({
    selector: 'mebli-add-manual',
    templateUrl: './add-manual.component.html',
    styleUrls: ['./add-manual.component.css'],
})
export class AddManualComponent implements OnInit {
    public isMultiselect = false;
    public selectedMedia: MediaSearchResult[] = [];

    public constructor(
        private readonly navbarService: NavbarService,
        private readonly router: Router,
        private readonly imdbApiService: ImdbApiService,
        private readonly myLibraryService: MyLibraryService,
        public readonly mediaSearchService: MediaSearchService
    ) {}

    public ngOnInit(): void {
        this.navbarService.resetActions();
        this.registerActions();
    }

    public selectMediaSearchResult(mediaSearchResult: MediaSearchResult): void {
        const index = this.selectedMedia.findIndex((result: MediaSearchResult) => result.id === mediaSearchResult.id);
        if (index === -1) {
            this.selectedMedia.push(mediaSearchResult);
        } else {
            this.selectedMedia.splice(index, 1);
        }

        if (this.isMultiselect !== this.selectedMedia.length > 0) {
            this.isMultiselect = this.selectedMedia.length > 0;
            this.navbarService.resetActions();
            this.registerActions();
        }
    }

    public addSelection(): void {
        this.selectedMedia.forEach(async (mediaSearchResult: MediaSearchResult) => {
            const mediaDetails: MediaDetails = await firstValueFrom(
                this.imdbApiService.getMediaDetails(mediaSearchResult.id)
            );
            this.myLibraryService.addToLibrary(mediaDetails);
        });
    }

    private registerActions(): void {
        this.isMultiselect
            ? this.navbarService.registerActions([
                  {
                      order: -1,
                      icon: 'back',
                      translationKey: 'back',
                      action: () => this.router.navigate(['/library']),
                  },
                  {
                      order: 0,
                      icon: 'home',
                      translationKey: 'home',
                      action: () => this.router.navigate(['/']),
                  },
                  {
                      order: 1,
                      icon: 'search',
                      translationKey: 'search',
                      action: () => this.mediaSearchService.searchMedia(),
                  },
                  {
                      order: 2,
                      icon: 'add',
                      translationKey: 'add',
                      action: () => this.addSelection(),
                  },
              ])
            : this.navbarService.registerActions([
                  {
                      order: -1,
                      icon: 'back',
                      translationKey: 'back',
                      action: () => this.router.navigate(['/library']),
                  },
                  {
                      order: 0,
                      icon: 'home',
                      translationKey: 'home',
                      action: () => this.router.navigate(['/']),
                  },
                  {
                      order: 1,
                      icon: 'search',
                      translationKey: 'search',
                      action: () => this.mediaSearchService.searchMedia(),
                  },
              ]);
    }
}
