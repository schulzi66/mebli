import { MediaDetails } from '@mebli/imdb-api';

export interface Media extends MediaDetails {
    uid?: string;
    pathId?: string;
    comment?: string;
    blueray?: boolean;
    ownedSeasons: boolean[];
}
