import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, LoginComponent, RegisterComponent } from '@mebli/auth';
import { StartPageComponent } from '@mebli/start-page';

const routes: Routes = [
    { path: '', component: StartPageComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: 'library',
        loadChildren: () => import('@mebli/my-library').then((m) => m.MyLibraryModule),
        canActivate: [AuthGuard],
    },
    {
        path: 'rentals',
        loadChildren: () => import('@mebli/rentals').then((m) => m.RentalsModule),
        canActivate: [AuthGuard],
    },
    {
        path: 'media-search',
        loadChildren: () => import('@mebli/media-search').then((m) => m.MediaSearchModule),
        canActivate: [AuthGuard],
    },
    {
        path: 'releases',
        loadChildren: () => import('@mebli/releases').then((m) => m.ReleasesModule),
        canActivate: [AuthGuard],
    },
    {
        path: 'profile',
        loadChildren: () => import('@mebli/profile').then((m) => m.ProfileModule),
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
    { path: '**', redirectTo: '' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
