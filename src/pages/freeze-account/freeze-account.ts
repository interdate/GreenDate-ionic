import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';

/*
  Generated class for the FreezeAccount page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-freeze-account',
  templateUrl: 'freeze-account.html'
})
export class FreezeAccountPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FreezeAccountPage');
  }

  submit() {
    this.navCtrl.push(LoginPage);
  }

}
