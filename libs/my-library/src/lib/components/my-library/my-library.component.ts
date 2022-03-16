import { Component } from '@angular/core';
import { NavbarService } from '@mebli/nav';

@Component({
    selector: 'mebli-my-library',
    templateUrl: './my-library.component.html',
    styleUrls: ['./my-library.component.css'],
})
export class MyLibraryComponent {
    public constructor(private readonly navbarService: NavbarService) {
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
                    console.log('add clicked');
                },
            },
        ]);
    }
}
