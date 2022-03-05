import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, LoginComponent, RegisterComponent } from '@mebli/auth';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: 'library',
        loadChildren: () => import('@mebli/my-library').then((m) => m.MyLibraryModule),
        canActivate: [AuthGuard],
    },
    { path: '', pathMatch: 'full', redirectTo: 'library' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
