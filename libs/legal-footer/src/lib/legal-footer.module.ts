import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { LegalFooterComponent } from './components/legal-footer/legal-footer.component';

@NgModule({
    imports: [CommonModule, RouterModule, TranslocoModule],
    declarations: [LegalFooterComponent],
    exports: [LegalFooterComponent],
})
export class LegalFooterModule {}
