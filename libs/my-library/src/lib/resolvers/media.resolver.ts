import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Media } from '../models/media';
import { MyLibraryService } from './../services/my-library.service';

@Injectable({ providedIn: 'root' })
export class MediaResolver implements Resolve<Media | undefined> {
    public constructor(private readonly myLibraryService: MyLibraryService) {}

    public resolve(
        route: ActivatedRouteSnapshot
    ): Observable<Media | undefined> | Promise<Media | undefined> | Media | undefined {
        return this.myLibraryService.library.find((m) => m.id === route.params['id']);
    }
}
