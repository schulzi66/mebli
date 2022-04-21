import { MediaType } from '@mebli/imdb-api';

export interface RentalRequest {
    ownerUid?: string;
    mediaId: string;
    mediaTitle: string;
    mediaPathId?: string;
    mediaType?: MediaType;
    requesterId: string;
    requesterName?: string;
    requestedSeasons?: boolean[];
    blueray?: boolean;
}
