import { Injectable } from '@angular/core';
import { DbPaths, DbService } from '@mebli/db';
import { Media, MyLibraryService } from '@mebli/my-library';
import { Release, ReleasesService } from '@mebli/releases';

@Injectable({
    providedIn: 'root',
})
export class MediaSearchService {
    public searchTerm = '';
    public includeMovies = true;
    public includeSeries = true;
    public includeBluRay = true;
    public currentSelection: 'Foreign' | 'Own' = 'Foreign';

    public resultsForeignLibrary: { release: Release; media: Media }[] = [];
    public resultsOwnLibrary: Media[] = [];
    private foreignLibraries: { release: Release; media: Media[] }[] = [];

    public constructor(
        private readonly releasesService: ReleasesService,
        private readonly myLibraryService: MyLibraryService,
        private readonly db: DbService
    ) {
        this.releasesService.queryUserReleases();
        this.releasesService.userReleases$.subscribe(() => this.queryForeignLibraries());
    }

    public search(): void {
        if (this.searchTerm !== '') {
            this.resultsForeignLibrary = [];
            this.resultsOwnLibrary = [];

            if (this.includeMovies) {
                this.myLibraryService.movies.forEach((media: Media) => {
                    if (
                        (this.includeBluRay ? true : !media.bluray ?? false) &&
                        (media.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                            media.description?.toLowerCase().includes(this.searchTerm.toLowerCase()))
                    ) {
                        this.resultsOwnLibrary.push(media);
                    }
                });

                this.foreignLibraries.forEach((library: { release: Release; media: Media[] }) => {
                    library.media.forEach((media: Media) => {
                        if (
                            media.type === 'Movie' &&
                            (this.includeBluRay ? true : !media.bluray ?? false) &&
                            (media.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                                media.description?.toLowerCase().includes(this.searchTerm.toLowerCase()))
                        ) {
                            this.resultsForeignLibrary.push({ release: library.release, media });
                        }
                    });
                });
            }

            if (this.includeSeries) {
                this.myLibraryService.series.forEach((media: Media) => {
                    if (
                        (this.includeBluRay ? true : !media.bluray ?? false) &&
                        (media.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                            media.description?.toLowerCase().includes(this.searchTerm.toLowerCase()))
                    ) {
                        this.resultsOwnLibrary.push(media);
                    }
                });

                this.foreignLibraries.forEach((library: { release: Release; media: Media[] }) => {
                    library.media.forEach((media: Media) => {
                        if (
                            media.type === 'TVSeries' &&
                            (this.includeBluRay ? true : !media.bluray ?? false) &&
                            (media.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                                media.description?.toLowerCase().includes(this.searchTerm.toLowerCase()))
                        ) {
                            this.resultsForeignLibrary.push({ release: library.release, media });
                        }
                    });
                });
            }
        }
    }

    public queryForeignLibraries(): void {
        this.foreignLibraries = [];
        this.releasesService.userReleases?.foreignLibraryReleases.forEach((release: Release) => {
            this.db
                .getDocs$<Media>(DbPaths.MEDIA, 'uid', '==', release.uid, 'title', 'asc')
                .subscribe((media: Media[]) => {
                    const index: number = this.foreignLibraries.findIndex(
                        (x: { release: Release; media: Media[] }) => x.release.uid === release.uid
                    );

                    if (index !== -1) {
                        this.foreignLibraries[index].media = media;
                    } else {
                        this.foreignLibraries.push({ release, media });
                    }
                });
        });
    }

    public switchSelection(selection: 'Foreign' | 'Own'): void {
        this.currentSelection = selection;
    }
}
