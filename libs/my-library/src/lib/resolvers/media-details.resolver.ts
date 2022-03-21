import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { MediaDetails } from '@mebli/imdb-api';
import { Observable } from 'rxjs';
import { AddManualService } from './../services/add-manual.service';

@Injectable({ providedIn: 'root' })
export class MediaDetailsResolver implements Resolve<MediaDetails> {
    public constructor(private readonly addManualService: AddManualService) {}

    public resolve(route: ActivatedRouteSnapshot): Observable<MediaDetails> | Promise<MediaDetails> | MediaDetails {
        const details: MediaDetails | undefined = this.addManualService.mediaDetailsBuffer.find(
            (details) => details.id === route.params['id']
        );
        return details === undefined ? this.addManualService.searchMediaDetails(route.params['id']) : details;
    }
}
