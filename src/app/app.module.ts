import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AngularFireModule, AuthMethods, AuthProviders } from "angularfire2";

import { AppComponent } from './app.component';

import { MessagesService } from './shared/messages.service';


const firebaseConfig = {
  apiKey: "AIzaSyD28_SnLK07mIthHdVX0RtK94GI7AEWfDg",
  authDomain: "angular-2-auth-e6c05.firebaseapp.com",
  databaseURL: "https://angular-2-auth-e6c05.firebaseio.com",
  storageBucket: "angular-2-auth-e6c05.appspot.com",
  messagingSenderId: "807948696089"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    AngularFireModule.initializeApp(firebaseConfig, {
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    })
  ],
  providers: [ MessagesService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
