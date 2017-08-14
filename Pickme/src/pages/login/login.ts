import { Component } from '@angular/core';
import { NavController,App } from 'ionic-angular';
import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController,public app:App) {

  }

  register()
  {
    this.app.getRootNav().setRoot(RegisterPage);
  }

}
