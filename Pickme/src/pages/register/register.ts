import { Component } from '@angular/core';
import { NavController,App } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  constructor(public navCtrl: NavController,public app:App) {

  }

  login()
  {
    this.app.getRootNav().setRoot(LoginPage);
  }

}
