import { MediaType } from '@mebli/imdb-api';

export interface RentalRequest {
    ownerUid?: string;
    ownerName?: string;
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
    requesterId: string;
    requesterName?: string;
    requestedSeasons?: boolean[];
    blueray?: boolean;
    pathId?: string;
}
