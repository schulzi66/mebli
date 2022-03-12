import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, LoginComponent, RegisterComponent } from '@mebli/auth';
import { StartPageComponent } from '@mebli/start-page';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: 'library',
        loadChildren: () => import('@mebli/my-library').then((m) => m.MyLibraryModule),
        canActivate: [AuthGuard],
    },
    {
        path: 'impressum',
        loadChildren: () => import('@mebli/impressum').then((m) => m.ImpressumModule),
    },
    {
        path: 'about',
        loadChildren: () => import('@mebli/about').then((m) => m.AboutModule),
    },
    { path: '', component: StartPageComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
