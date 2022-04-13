import { MediaType } from '@mebli/imdb-api';

export interface Rental {
    uid?: string;
    mediaId: string;
    mediaPathId?: string;
    mediaTitle: string;
    mediaType?: MediaType;
    borrowerName: string;
    borrowerId?: string;
    lendingDate: string;
    lendingDeadline?: string;
    comment?: string;
    blueray?: boolean;
    lentSeasons?: string[];
}
