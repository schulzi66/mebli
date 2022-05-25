import { MediaDetails } from '@mebli/imdb-api';

export interface Media extends MediaDetails {
    uid?: string;
    pathId?: string;
    comment?: string;
    bluray?: boolean;
    ownedSeasons: boolean[];
    fskRating?: string;
}
