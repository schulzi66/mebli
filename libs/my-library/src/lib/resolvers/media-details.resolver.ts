import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { MediaDetails } from '@mebli/imdb-api';
import { Observable } from 'rxjs';
import { MediaSearchService } from '../services/media-search.service';

@Injectable({ providedIn: 'root' })
export class MediaDetailsResolver implements Resolve<MediaDetails> {
    public constructor(private readonly mediaSearchService: MediaSearchService) {}

    public resolve(route: ActivatedRouteSnapshot): Observable<MediaDetails> | Promise<MediaDetails> | MediaDetails {
        const details: MediaDetails | undefined = this.mediaSearchService.mediaDetailsBuffer.find(
            (details) => details.id === route.params['id']
        );
        return details === undefined ? this.mediaSearchService.searchMediaDetails(route.params['id']) : details;
    }
}
