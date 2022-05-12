import { MediaType } from '@mebli/imdb-api';

export interface Rental {
    blueray?: boolean;
    borrowerComment?: string;
    borrowerId?: string;
    borrowerName?: string;
    fskRating?: string;
    lendingDate: string;
    lendingDeadline?: string;
    lentSeasons?: boolean[];
    mediaContentRating?: string;
    mediaGenres?: string;
    mediaId: string;
    mediaImage?: string;
    mediaPathId?: string;
    mediaPlot?: string;
    mediaPlotLocal?: string;
    mediaStars?: string;
    mediaTitle: string;
    mediaType?: MediaType;
    mediaYear?: string;
    ownerComment?: string;
    ownerName?: string;
    ownerUid?: string;
    pathId?: string;
}
