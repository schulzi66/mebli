import { Injectable } from '@angular/core';
import { AuthService } from '@mebli/auth';
import { DbPaths, DbService } from '@mebli/db';
import { Media } from '../models/media';

@Injectable({
    providedIn: 'root',
})
export class MyLibraryService {
    public library: Media[] = [];
    public constructor(private readonly db: DbService, private readonly authService: AuthService) {}

    public getLibrary() {
        this.db.getDocs$<Media>(DbPaths.MEDIA, 'uid', '==', this.authService.uid).subscribe((media: Media[]) => {
            this.library = media;
        });
    }
}
