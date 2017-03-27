import { Component } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { MessagesService } from './shared/messages.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  user = {};
  isAuth = false;
  messages = [];
  name: string;
  avatar: string;
  message: string;

  constructor(public af: AngularFire, private messageService : MessagesService) {
    this.name = "";
    this.avatar = "";
    this.message = "";
    
    this.af.auth.subscribe(
      user => this._changeState(user),
      error => console.trace(error)
    );
  }

  login(from: string) {
    this.af.auth.login({
      provider: this._getProvider(from)
    });
  }

  logout() {
    this.af.auth.logout();
    console.log('user logout');
  }

  sendMessage() {
    var data = {
      name: this.name,
      text: this.message,
      photoUrl: this.avatar || '/images/profile_placeholder.png'
    }
    this.messageService.addMessages(data).then((data) => this.message = "", (err) => console.log(err));
  }

  private _changeState(user: any = null) {
    if (user) {
      console.log(user);
      this.isAuth = true;
      this.user = this._getUserInfo(user);
      this.messageService.findAllMessages().subscribe(
        data => {
          this.messages = data;
        },
      ) 
    }
    else {
      this.isAuth = false;
      this.user = {};
      this.name = "";
      this.avatar = "";
      this.messages = [];
    }
  }

  private _getUserInfo(user: any): any {
    if (!user) {
      return {};
    }
    let data = user.auth.providerData[0];
    this.name = data.displayName;
    this.avatar = data.photoURL;
    return {
      name: data.displayName,
      avatar: data.photoURL,
      email: data.email,
      provider: data.providerId
    };
  }


  private _getProvider(from: string) {
    switch (from) {
      case 'twitter': return AuthProviders.Twitter;
      case 'facebook': return AuthProviders.Facebook;
      case 'github': return AuthProviders.Github;
      case 'google': return AuthProviders.Google;
    }
  }
}
