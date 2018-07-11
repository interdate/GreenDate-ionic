import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ApiQuery} from "../../library/api-query";

/*
  Generated class for the MainMenu page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-main-menu',
  templateUrl: 'main-menu.html'
})
export class MainMenuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public api: ApiQuery) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainMenuPage');
  }

  ionViewWillEnter() {
    this.api.pageName = 'MainMenuPage';
    console.log('MainMenuPage '+ this.api.pageName);
  }

}
