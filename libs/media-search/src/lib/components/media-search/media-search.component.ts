import { Component } from '@angular/core';
import { NavbarService } from '@mebli/nav';
import { MediaSearchService } from './../../services/media-search.service';

@Component({
    selector: 'mebli-media-search',
    templateUrl: './media-search.component.html',
    styleUrls: ['./media-search.component.css'],
})
export class MediaSearchComponent {
    public constructor(
        private readonly navbarService: NavbarService,
        public readonly mediaSearchService: MediaSearchService
    ) {
        this.navbarService.registerActions([
            {
                order: 1,
                icon: 'search',
                translationKey: 'search',
                action: () => this.mediaSearchService.search(),
            },
        ]);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public clearSearch(event: any): void {
        // Clear Button Event has no inputType
        if (!event.inputType) {
            this.mediaSearchService.searchTerm === '';
        }
    }

   
}
