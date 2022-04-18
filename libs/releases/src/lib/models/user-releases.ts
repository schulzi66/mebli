import { OwnRelease } from './own-release';
import { Release } from './release';

export interface UserReleases {
    uid: string;
    foreignLibraryReleases: Release[];
    ownReleases: OwnRelease[];
}
