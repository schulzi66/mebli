import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

@NgModule({
    imports: [CommonModule, provideFirestore(() => getFirestore())],
})
export class DbModule {}
