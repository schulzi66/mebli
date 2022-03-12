import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LegalFooterModule } from '@mebli/legal-footer';
import { TranslocoModule } from '@ngneat/transloco';
import { StartPageComponent } from './components/start-page/start-page.component';

@NgModule({
    imports: [
        CommonModule,
        TranslocoModule,
        LegalFooterModule,
        RouterModule.forChild([{ path: '', component: StartPageComponent }]),
    ],
    declarations: [StartPageComponent],
    exports: [StartPageComponent],
})
export class StartPageModule {}
