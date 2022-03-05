import { MyLibraryComponent } from './components/my-library/my-library.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [CommonModule, RouterModule.forChild([{ path: '', component: MyLibraryComponent }])],
    declarations: [MyLibraryComponent],
    exports: [MyLibraryComponent],
})
export class MyLibraryModule {}
