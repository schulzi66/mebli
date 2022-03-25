import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@mebli/auth';
import { DbPaths, DbService } from '@mebli/db';
import { MediaDetails } from '@mebli/imdb-api';
import { Media } from '../models/media';

@Injectable({
    providedIn: 'root',
})
export class MyLibraryService {
    public library: Media[] = [];
    public constructor(
        private readonly db: DbService,
        private readonly authService: AuthService,
        private readonly router: Router
    ) {}

    public queryLibrary(): void {
        this.db.getDocs$<Media>(DbPaths.MEDIA, 'uid', '==', this.authService.uid).subscribe((media: Media[]) => {
            this.library = media;
        });
    }

    public addToLibrary(mediaDetails: MediaDetails | Media | undefined): void {
        if (mediaDetails && this.authService.uid) {
            const pathId = this.db.generateId();
            const media: Media = Object.assign({ uid: this.authService.uid, pathId: pathId } as Media, mediaDetails);

            this.db.setDoc<MediaDetails>(DbPaths.MEDIA, pathId, media).then(() => this.router.navigate(['/library']));
        }
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
