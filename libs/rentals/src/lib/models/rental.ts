import { MediaType } from '@mebli/imdb-api';

export interface Rental {
    ownerUid?: string;
    ownerName?: string;
    ownerComment?: string;
    mediaId: string;
    mediaTitle: string;
    mediaPathId?: string;
    mediaType?: MediaType;
    mediaImage?: string;
    mediaStars?: string;
    mediaGenres?: string;
    mediaYear?: string;
    mediaContentRating?: string;
    mediaPlot?: string;
    mediaPlotLocal?: string;
    borrowerId?: string;
    borrowerName?: string;
    borrowerComment?: string;
    lendingDate: string;
    lendingDeadline?: string;
    blueray?: boolean;
    lentSeasons?: boolean[];
    pathId?: string;
}
