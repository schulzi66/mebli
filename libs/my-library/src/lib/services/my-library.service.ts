import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@mebli/auth';
import { DbPaths, DbService } from '@mebli/db';
import { MediaDetails, MediaType } from '@mebli/imdb-api';
import { Media } from '../models/media';

@Injectable({
    providedIn: 'root',
})
export class MyLibraryService {
    public library: Media[] = [];
    public filteredLibrary: Media[] = [];
    public currentSelection: MediaType = 'Movie';
    public movies: Media[] = [];
    public series: Media[] = [];

    public constructor(
        private readonly db: DbService,
        private readonly authService: AuthService,
        private readonly router: Router
    ) {
        this.queryLibrary();
    }

    public queryLibrary(): void {
        this.db
            .getDocs$<Media>(DbPaths.MEDIA, 'uid', '==', this.authService.uid, 'title', 'asc')
            .subscribe((media: Media[]) => {
                this.library = media;
                this.movies = [];
                this.series = [];
                media.forEach((media: Media) => {
                    media.type === 'Movie' ? this.movies.push(media) : this.series.push(media);
                });
                this.clearSearch();
            });
    }

    public addToLibrary(mediaDetails: MediaDetails | Media | undefined): void {
        if (mediaDetails && this.authService.uid) {
            const pathId = this.db.generateId();
            const media: Media = Object.assign({ uid: this.authService.uid, pathId: pathId } as Media, mediaDetails);

            this.db.setDoc<MediaDetails>(DbPaths.MEDIA, pathId, media).then(() => this.router.navigate(['/library']));
        }
    }

    public switchSelection(selection: MediaType) {
        this.currentSelection = selection;
        this.currentSelection === 'Movie' ? (this.filteredLibrary = this.movies) : (this.filteredLibrary = this.series);
    }

    public search(searchTerm: string): void {
        if (this.currentSelection === 'Movie') {
            this.filteredLibrary = this.movies.filter(
                (media: Media) =>
                    media.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    media.description?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        } else if (this.currentSelection === 'TVSeries') {
            this.filteredLibrary = this.series.filter(
                (media: Media) =>
                    media.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    media.description?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
    }

    public clearSearch(): void {
        this.filteredLibrary = this.currentSelection === 'Movie' ? this.movies : this.series;
    }

    public updateMedia(media: Media | undefined): void {
        if (media && media.pathId) {
            this.db.updateDocument<Media>(DbPaths.MEDIA, media.pathId, media);
        }
    }

    public deleteFromLibrary(media: Media | undefined): void {
        if (media && media.pathId && this.authService.uid) {
            this.db.deleteDocument<Media>(DbPaths.MEDIA, media.pathId).then(() => this.router.navigate(['/library']));
        }
    }
}
