import { Injectable } from '@angular/core';
import { AuthService, Profile } from '@mebli/auth';
import { DbPaths, DbService } from '@mebli/db';
import { OwnRelease } from '../models/own-release';
import { ReleaseSelection } from '../models/releaseSelection';
import { UserReleases } from '../models/user-releases';
import { Release } from './../models/release';

@Injectable({
    providedIn: 'root',
})
export class ReleasesService {
    public currentSelection: ReleaseSelection = 'Foreign';
    public userReleases: UserReleases | undefined;

    public constructor(private readonly db: DbService, private readonly authService: AuthService) {
        this.queryUserReleases();
    }

    public queryUserReleases(): void {
        if (this.authService.uid) {
            this.db
                .getDoc$<UserReleases>(DbPaths.RELEASES, this.authService.uid)
                .subscribe((userReleases: UserReleases | undefined) => {
                    this.userReleases = userReleases;

                    if (this.userReleases === undefined && this.authService.uid) {
                        this.userReleases = { uid: this.authService.uid, foreignLibraryReleases: [], ownReleases: [] };
                    }
                });
        }
    }

    public async addOwnRelease(ownRelease: OwnRelease): Promise<void> {
        if (
            ownRelease &&
            ownRelease.uid &&
            ownRelease.accountName &&
            this.authService.uid &&
            this.authService.accountName &&
            this.userReleases
        ) {
            this.userReleases?.ownReleases.push(ownRelease);
            await this.db.setDoc<UserReleases>(DbPaths.RELEASES, this.authService.uid, this.userReleases, {
                merge: true,
            });

            let releaseFromOtherUser: UserReleases | undefined = await this.getReleasesFromOtherUser(ownRelease.uid);

            if (releaseFromOtherUser === undefined) {
                releaseFromOtherUser = {
                    uid: ownRelease.uid,
                    foreignLibraryReleases: [
                        {
                            uid: this.authService.uid,
                            accountName: this.authService.accountName,
                            rating: ownRelease.rating,
                        },
                    ],
                    ownReleases: [],
                };
            } else {
                releaseFromOtherUser.foreignLibraryReleases.push({
                    uid: this.authService.uid,
                    accountName: this.authService.accountName,
                    rating: ownRelease.rating,
                });
            }

            this.db.setDoc<UserReleases>(DbPaths.RELEASES, releaseFromOtherUser.uid, releaseFromOtherUser, {
                merge: true,
            });
        }
    }

    public async removeOwnRelease(ownRelease: OwnRelease): Promise<void> {
        const index: number | undefined = this.userReleases?.ownReleases.findIndex(
            (release: OwnRelease) => release.uid === ownRelease.uid
        );

        if (index !== undefined && index !== -1 && ownRelease.uid) {
            this.userReleases?.ownReleases.splice(index, 1);
            this.updateUserReleases();

            const releaseFromOtherUser: UserReleases | undefined = await this.getReleasesFromOtherUser(ownRelease.uid);

            if (releaseFromOtherUser) {
                const foreignIndex: number | undefined = this.findForeignIndex(releaseFromOtherUser);

                if (foreignIndex !== undefined && foreignIndex !== -1) {
                    releaseFromOtherUser.foreignLibraryReleases.splice(foreignIndex, 1);
                    this.db.updateDocument<UserReleases>(
                        DbPaths.RELEASES,
                        releaseFromOtherUser.uid,
                        releaseFromOtherUser
                    );
                }
            }
        }
    }

    public removeForeignRelease(foreignRelease: Release): void {
        const index: number | undefined = this.userReleases?.foreignLibraryReleases.findIndex(
            (release: Release) => release.uid === foreignRelease.uid
        );

        if (index !== undefined && index !== -1) {
            this.userReleases?.foreignLibraryReleases.splice(index, 1);
            this.updateUserReleases();
        }
    }

    public async updateEditedUserReleases(ownRelease: OwnRelease): Promise<void> {
        if (ownRelease && ownRelease.uid) {
            this.updateUserReleases();

            const releaseFromOtherUser: UserReleases | undefined = await this.getReleasesFromOtherUser(ownRelease.uid);

            if (releaseFromOtherUser) {
                const foreignIndex: number | undefined = this.findForeignIndex(releaseFromOtherUser);

                if (foreignIndex !== undefined && foreignIndex !== -1) {
                    releaseFromOtherUser.foreignLibraryReleases[foreignIndex] = {
                        ...releaseFromOtherUser.foreignLibraryReleases[foreignIndex],
                        ...{ rating: ownRelease.rating },
                    };

                    this.db.updateDocument<UserReleases>(
                        DbPaths.RELEASES,
                        releaseFromOtherUser.uid,
                        releaseFromOtherUser
                    );
                }
            }
        }
    }

    public async searchAccountName(accountName: string): Promise<Profile | undefined> {
        return this.db.getDocBy<Profile>(DbPaths.PROFILES, 'accountName', '==', accountName);
    }

    public switchSelection(selection: ReleaseSelection) {
        this.currentSelection = selection;
    }

    public updateUserReleases(): void {
        if (this.authService.uid && this.userReleases) {
            this.db.updateDocument<UserReleases>(DbPaths.RELEASES, this.authService.uid, this.userReleases);
        }
    }

    private async getReleasesFromOtherUser(uid: string): Promise<UserReleases | undefined> {
        return this.db.getDocBy<UserReleases | undefined>(DbPaths.RELEASES, 'uid', '==', uid);
    }

    private findForeignIndex(releaseFromOtherUser: UserReleases): number | undefined {
        return releaseFromOtherUser.foreignLibraryReleases.findIndex(
            (release: Release) => release.uid === this.authService.uid
        );
    }
}
