import { Component } from '@angular/core';
import { StartPageService } from '../../services/start-page.service';

@Component({
    selector: 'mebli-start-page',
    templateUrl: './start-page.component.html',
    styleUrls: ['./start-page.component.css'],
})
export class StartPageComponent {
    public constructor(public readonly startPageService: StartPageService) {}
}
