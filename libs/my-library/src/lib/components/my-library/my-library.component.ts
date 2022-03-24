import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from '@mebli/nav';
import { MyLibraryService } from '../../services/my-library.service';

@Component({
    selector: 'mebli-my-library',
    templateUrl: './my-library.component.html',
    styleUrls: ['./my-library.component.css'],
})
export class MyLibraryComponent {
    public constructor(
        private readonly navbarService: NavbarService,
        private readonly router: Router,
        public readonly myLibraryService: MyLibraryService
    ) {
        this.navbarService.registerActions([
            {
                order: -1,
                icon: 'search',
                translationKey: 'search',
                action: () => {
                    console.log('search clicked');
                },
            },
            {
                order: 1,
                icon: 'add',
                translationKey: 'add',
                action: () => {
                    // If scanning will work, change this and add a 'choose add method'-component
                    this.router.navigate(['/library/add/manual']);
                },
            },
        ]);
        this.myLibraryService.queryLibrary();
    }
}
