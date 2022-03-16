import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
    imports: [CommonModule, TranslocoModule],
    declarations: [NavbarComponent],
    exports: [NavbarComponent],
})
export class NavModule {}
