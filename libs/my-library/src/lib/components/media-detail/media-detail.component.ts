import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaDetails } from '@mebli/imdb-api';
import { NavbarService } from '@mebli/nav';
import { Media } from '../../models/media';
import { MyLibraryService } from '../../services/my-library.service';

@Component({
    selector: 'mebli-media-detail',
    templateUrl: './media-detail.component.html',
    styleUrls: ['./media-detail.component.css'],
})
export class MediaDetailComponent implements OnInit {
    public mediaDetails: MediaDetails | Media | undefined;

    public constructor(
        private readonly location: Location,
        private readonly navbarService: NavbarService,
        private readonly activatedRoute: ActivatedRoute,
        public readonly myLibraryService: MyLibraryService
    ) {}

    public ngOnInit(): void {
        if (this.activatedRoute.snapshot.params['id'] === undefined) {
            this.navigateBack();
        }

        this.registerActions(this.activatedRoute.snapshot.data['isNewMedia']);

        this.mediaDetails = this.activatedRoute.snapshot.data['isNewMedia']
            ? (this.activatedRoute.snapshot.data['mediaDetails'] as MediaDetails)
            : (this.activatedRoute.snapshot.data['media'] as Media);

        console.log(this.mediaDetails);
    }

    private navigateBack(): void {
        this.location.back();
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
                      action: () => this.myLibraryService.addToLibrary(this.mediaDetails),
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
                      action: () => console.log('comment'),
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
                    action: () => this.myLibraryService.deleteFromLibrary(this.mediaDetails as Media),
                },
              ]);
    }
}
