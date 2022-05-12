import { MediaType } from '@mebli/imdb-api';

export interface RentalRequest {
    blueray?: boolean;
    fskRating?: string;
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
    ownerName?: string;
    ownerUid?: string;
    pathId?: string;
    requestedSeasons?: boolean[];
    requesterId: string;
    requesterName?: string;
}
