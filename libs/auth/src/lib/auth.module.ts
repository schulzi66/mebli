import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LegalFooterModule } from '@mebli/legal-footer';
import { TranslocoModule } from '@ngneat/transloco';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule, TranslocoModule, LegalFooterModule],
    declarations: [LoginComponent, RegisterComponent],
    exports: [LoginComponent, RegisterComponent],
})
export class AuthModule {}
