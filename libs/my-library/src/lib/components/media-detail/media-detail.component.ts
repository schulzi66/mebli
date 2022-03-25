import { Location } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavbarService } from '@mebli/nav';
import { NgOverlayContainerService } from 'ng-overlay-container';
import { Media } from '../../models/media';
import { MyLibraryService } from '../../services/my-library.service';

@Component({
    selector: 'mebli-media-detail',
    templateUrl: './media-detail.component.html',
    styleUrls: ['./media-detail.component.css'],
})
export class MediaDetailComponent implements OnInit {
    public media: Media | undefined;
    @ViewChild('commentTemplate') private commentTemplate!: TemplateRef<any>;

    public constructor(
        private readonly location: Location,
        private readonly navbarService: NavbarService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly ngOverlayContainerService: NgOverlayContainerService,
        public readonly myLibraryService: MyLibraryService
    ) {}

    public ngOnInit(): void {
        if (this.activatedRoute.snapshot.params['id'] === undefined) {
            this.navigateBack();
        }

        this.registerActions(this.activatedRoute.snapshot.data['isNewMedia']);

        this.media = this.activatedRoute.snapshot.data['isNewMedia']
            ? (this.activatedRoute.snapshot.data['mediaDetails'] as Media)
            : (this.activatedRoute.snapshot.data['media'] as Media);

        console.log(this.media);
    }

    private navigateBack(): void {
        this.location.back();
    }

    public openCommentPopup(): void {
        const ngPopoverRef = this.ngOverlayContainerService.open<Media | undefined, void>({
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
        ngPopoverRef.afterClosed$.subscribe(() => this.myLibraryService.updateMedia(this.media));
    }

    private registerActions(isNewMedia: boolean | undefined): void {
        isNewMedia
            ? this.navbarService.registerActions([
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
                      action: () => this.myLibraryService.addToLibrary(this.media),
                  },
              ])
            : this.navbarService.registerActions([
                  {
                      order: -2,
                      icon: 'back',
                      translationKey: 'back',
                      action: () => this.navigateBack(),
                  },
                  {
                      order: -1,
                      icon: 'comment',
                      translationKey: 'comment',
                      action: () => this.openCommentPopup(),
                  },
                  {
                      order: 1,
                      icon: 'up',
                      translationKey: 'lend_movie',
                      action: () => console.log('lend'),
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
