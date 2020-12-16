import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment.prod';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { HistoryComponent } from './pages/history/history.component';
import { WhiskeysComponent } from './pages/whiskeys/whiskeys.component';
import { DrinksComponent } from './pages/drinks/drinks.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AdminComponent } from './admin/admin.component';
import { AdminWhiskeysComponent } from './admin/admin-whiskeys/admin-whiskeys.component';
import { AdminDrinksComponent } from './admin/admin-drinks/admin-drinks.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { WhiskeyDetailsComponent } from './pages/whiskey-details/whiskey-details.component';
import { DrinkDetailsComponent } from './pages/drink-details/drink-details.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    HistoryComponent,
    WhiskeysComponent,
    DrinksComponent,
    ContactComponent,
    AdminComponent,
    AdminWhiskeysComponent,
    AdminDrinksComponent,
    ProfileComponent,
    WhiskeyDetailsComponent,
    DrinkDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
