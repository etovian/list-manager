import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { MainMenuItemService } from './services/main-menu-item.service';
import { ListService } from './services/list.service';
import { LoginService } from "./services/login.service";
import { AuthorizedUserService } from "./services/authorized-user.service";

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ListsComponent } from './lists/lists.component';
import { RegularItemsComponent } from './regular-items/regular-items.component';
import { ListDetailComponent } from './list-detail/list-detail.component';
import { LoginComponent } from './login/login.component';
import {ListsResolverService} from "./resolvers/lists-resolver.service";

export const firebaseConfig = {
    apiKey: "AIzaSyCpLSW1tR2ZfOOxXCM1Lj5fp0HBsm6Bqos",
    authDomain: "mjg-home.firebaseapp.com",
    databaseURL: "https://mjg-home.firebaseio.com",
    storageBucket: "mjg-home.appspot.com",
    messagingSenderId: "910834859617"
};

export const firebaseAuthConfig = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password
};

@NgModule({
    declarations: [
        AppComponent,
        WelcomeComponent,
        ListsComponent,
        RegularItemsComponent,
        ListDetailComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
    ],
    providers: [
        MainMenuItemService,
        ListService,
        LoginService,
        AuthorizedUserService,
        ListsResolverService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
