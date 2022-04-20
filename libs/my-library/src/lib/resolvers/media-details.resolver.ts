import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { MediaDetails } from '@mebli/imdb-api';
import { Observable } from 'rxjs';
import { MediaInformationService } from '../services/media-information.service';

@Injectable({ providedIn: 'root' })
export class MediaDetailsResolver implements Resolve<MediaDetails> {
    public constructor(private readonly mediaInformationService: MediaInformationService) {}

    public resolve(route: ActivatedRouteSnapshot): Observable<MediaDetails> | Promise<MediaDetails> | MediaDetails {
        const details: MediaDetails | undefined = this.mediaInformationService.mediaDetailsBuffer.find(
            (details) => details.id === route.params['id']
        );
        return details === undefined ? this.mediaInformationService.searchMediaDetails(route.params['id']) : details;
    }
}
