import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { HistoryComponent } from './pages/history/history.component';
import { WhiskeysComponent } from './pages/whiskeys/whiskeys.component';
import { DrinksComponent } from './pages/drinks/drinks.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { WhiskeyDetailsComponent } from './pages/whiskey-details/whiskey-details.component';
import { DrinkDetailsComponent } from './pages/drink-details/drink-details.component';
import { AdminComponent } from './admin/admin.component';
import { AdminWhiskeysComponent } from './admin/admin-whiskeys/admin-whiskeys.component';
import { AdminDrinksComponent } from './admin/admin-drinks/admin-drinks.component';
import { ProfileGuard } from './shared/guards/profile.guard';
import { AuthComponent } from './auth/auth.component';
import { AdminGuard } from './shared/guards/admin.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'our-whiskeys', component: WhiskeysComponent },
  { path: 'our-whiskeys/:name', component: WhiskeyDetailsComponent },
  { path: 'our-drinks', component: DrinksComponent },
  { path: 'our-drinks/:name', component: DrinkDetailsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [ProfileGuard] },
  { path: 'admin-login', component: AuthComponent },
  {
    path: 'admin', component: AdminComponent, canActivate: [AdminGuard], children: [
      { path: '', pathMatch: 'full', redirectTo: 'whiskeys' },
      { path: 'whiskeys', component: AdminWhiskeysComponent },
      { path: 'drinks', component: AdminDrinksComponent },
    ]
  },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
