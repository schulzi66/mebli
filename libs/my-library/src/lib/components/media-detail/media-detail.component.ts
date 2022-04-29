import { Location } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarService } from '@mebli/nav';
import { NgOverlayContainerService, NgPopoverCloseEvent } from 'ng-overlay-container';
import { Media } from '../../models/media';
import { MyLibraryService } from '../../services/my-library.service';

@Component({
    selector: 'mebli-media-detail',
    templateUrl: './media-detail.component.html',
    styleUrls: ['./media-detail.component.css'],
})
export class MediaDetailComponent implements OnInit {
    public media: Media | undefined;
    public isNewMedia: boolean | undefined;
    private initialMedia: Media | undefined;

    @ViewChild('commentTemplate') private commentTemplate!: TemplateRef<any>;
    @ViewChild('addTemplate') private addTemplate!: TemplateRef<any>;

    public constructor(
        private readonly location: Location,
        private readonly router: Router,
        private readonly navbarService: NavbarService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly ngOverlayContainerService: NgOverlayContainerService,
        public readonly myLibraryService: MyLibraryService
    ) {}

    public ngOnInit(): void {
        if (this.activatedRoute.snapshot.params['id'] === undefined) {
            this.navigateBack();
        }

        this.isNewMedia = this.activatedRoute.snapshot.data['isNewMedia'];

        this.registerActions();

        this.media = this.isNewMedia
            ? (this.activatedRoute.snapshot.data['mediaDetails'] as Media)
            : (this.activatedRoute.snapshot.data['media'] as Media);

        if (this.media === undefined) {
            this.navigateBack();
        }

        if (
            this.media &&
            this.media.type === 'TVSeries' &&
            (this.isNewMedia || (!this.isNewMedia && this.media.ownedSeasons === undefined))
        ) {
            this.media.ownedSeasons = [];
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            this.media.tvSeriesInfo?.seasons?.forEach((_, i) => (this.media!.ownedSeasons[i] = false));
        }

        this.initialMedia = { ...this.media };
        console.log(this.media);
    }

    public openCommentPopup(): void {
        this.ngOverlayContainerService.open<Media | undefined, void>({
            content: this.commentTemplate,
            data: this.media,
            configuration: {
                useGlobalPositionStrategy: true,
                width: '90vw',
                height: '25vh',
                isResizable: false,
                backdropClass: 'cdk-overlay-dark-backdrop',
            },
        });
    }

    public openAddPopup(): void {
        const ngPopoverRef = this.ngOverlayContainerService.open<Media | undefined, { addMedia: boolean }>({
            content: this.addTemplate,
            data: this.media,
            configuration: {
                useGlobalPositionStrategy: true,
                width: '90vw',
                height: '90vh',
                isResizable: false,
                backdropClass: 'cdk-overlay-dark-backdrop',
            },
        });

        ngPopoverRef.afterClosed$.subscribe((event: NgPopoverCloseEvent<{ addMedia: boolean }>) => {
            if (event.data.addMedia) {
                this.myLibraryService.addToLibrary(this.media);
            }
        });
    }

    private navigateBack(): void {
        this.location.back();
    }

    private updateMediaIfChanged(): void {
        if (this.initialMedia !== this.media) {
            this.myLibraryService.updateMedia(this.media);
        }
    }

    private registerActions(): void {
        if (this.isNewMedia) {
            this.navbarService.registerActions([
                {
                    order: -1,
                    icon: 'back',
                    translationKey: 'back',
                    action: () => this.navigateBack(),
                },
                {
                    order: 1,
                    icon: 'add',
                    translationKey: 'add',
                    action: () => this.openAddPopup(),
                },
            ]);
        } else {
            this.navbarService.resetActions();
            this.navbarService.registerActions([
                {
                    order: -2,
                    icon: 'back',
                    translationKey: 'back',
                    action: () => {
                        this.updateMediaIfChanged();
                        this.navigateBack();
                    },
                },
                {
                    order: -1,
                    icon: 'comment',
                    translationKey: 'comment',
                    action: () => this.openCommentPopup(),
                },
                {
                    order: 0,
                    icon: 'home',
                    translationKey: 'home',
                    action: () => {
                        this.updateMediaIfChanged();
                        this.router.navigate(['/']);
                    },
                },
                {
                    order: 1,
                    icon: 'up',
                    translationKey: 'lend',
                    action: () => this.router.navigate(['./rentals/manual-lend', this.media?.id]),
                },

                {
                    order: 2,
                    icon: 'trash',
                    translationKey: 'delete',
                    action: () => this.myLibraryService.deleteFromLibrary(this.media),
                },
            ]);
        }
    }
}
