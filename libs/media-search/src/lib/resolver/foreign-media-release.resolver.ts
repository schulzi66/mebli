import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Media } from '@mebli/my-library';
import { Release } from '@mebli/releases';
import { Observable } from 'rxjs';
import { MediaSearchService } from '../services/media-search.service';

@Injectable({ providedIn: 'root' })
export class ForeignMediaReleaseResolver implements Resolve<{ release: Release; media: Media } | undefined> {
    public constructor(private readonly mediaSearchService: MediaSearchService) {}

    public resolve(
        route: ActivatedRouteSnapshot
    ):
        | Observable<{ release: Release; media: Media }>
        | Promise<{ release: Release; media: Media }>
        | { release: Release; media: Media }
        | undefined {
        return this.mediaSearchService.resultsForeignLibrary.find((x) => x.media.pathId === route.params['id']);
    }
}
