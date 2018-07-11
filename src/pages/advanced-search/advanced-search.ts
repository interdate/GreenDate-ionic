import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ApiQuery } from '../../library/api-query';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';

/*
  Generated class for the AdvancedSearch page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-advanced-search',
  templateUrl: 'advanced-search.html'
})
export class AdvancedSearchPage {

  /*form: { form: any } = {
    form: {
      region: { choices: [[]], },
      area: { choices: [[]], },
      ageTo: { choices: [[]], },
      ageFrom: { choices: [[]], },
      zodiac: { choices: [[]], },
      purposes: { choices: [[]], },
      relationshipStatus: { choices: [[]], },
      languages: { choices: [[]], },
      children: { choices: [[]], },
      status: { choices: [[]], },
      netWorth: { choices: [[]], },
      income: { choices: [[]], },
      heightFrom: { choices: [[]], },
      heightTo: { choices: [[]], },
      body: { choices: [[]], },
      eyes: { choices: [[]], },
      hair: { choices: [[]], },
      features: { choices: [[]], },
      smoking: { choices: [[]], },
      drinking: { choices: [[]], },
      ethnicity: { choices: [[]], },
      religion: { choices: [[]], },
      education: { choices: [[]], },
      distance: { choices: [[]], },
      withPhoto: { choices: [[]], },
     }
  } ;*/


    form: { form: any } = {
    form: {
      ageFrom: { choices: [[]], },
      ageTo: { choices: [[]], },
      body: { choices: [[]], },
      children: { choices: [[]], },
      drinking: { choices: [[]], },
      education: { choices: [[]], },
      filter:{},
      heightFrom: { choices: [[]], },
      heightTo: { choices: [[]], },
      occupation: { choices: [[]], },
      purposes: { choices: [[]], },
      region: { choices: [[]], },
      relationshipStatus: { choices: [[]], },
      religion: { choices: [[]], },
      sexOrientation: { choices: [[]], },
      smoking: { choices: [[]], },
      withPhoto: { choices: [[]], },
      type: { choices: [[]] }
     }
  } ;

  ageLower: any = 20;
  ageUpper: any = 50;

  ages: Array<{ num: number }> = [];

  default_range: any = { lower: this.ageLower, upper: this.ageUpper }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public api: ApiQuery
  ) {

    //this.form.form.ageFrom.value = 20;
    //this.form.form.ageTo.value = 50;

  this.http.get( api.url + '/api/v1/search?advanced=1', api.setHeaders(true) ).subscribe(data => {

  this.form.form = data.json();

    for (let i = 18; i <= 80; i++) {
      this.ages.push({num: i});
    }


  },err => {
    console.log("Oops!");
  });

  }

  toSearchResultsPage() {
    let params = JSON.stringify({
      action: 'search',
      advanced_search: {

      ageFrom: this.form.form.ageFrom.value,
      ageTo: this.form.form.ageTo.value,
      body: this.form.form.body.value,
      children: this.form.form.children.value,
      drinking: this.form.form.drinking.value,
      education: this.form.form.education.value,
      filter: this.form.form.filter.value,
      heightFrom: this.form.form.heightFrom.value,
      heightTo: this.form.form.heightTo.value,
      occupation: this.form.form.occupation.value,
      purposes: this.form.form.purposes.value,
      region: this.form.form.region.value,
      relationshipStatus: this.form.form.relationshipStatus.value,
      religion: this.form.form.religion.value,
      sexOrientation: this.form.form.sexOrientation.value,
      smoking: this.form.form.smoking.value,
      withPhoto: this.form.form.withPhoto.value,
      type: this.form.form.type.value

      }
    });
    this.navCtrl.push(HelloIonicPage, { params: params });
  }


  ionViewWillEnter() {
    this.api.pageName = 'AdvancedSearchPage';
  }

  selectedRegion()
  {
    this.http.get(this.api.url+'/api/v1/search?advanced=1&advanced_search[region]='+this.form.form.region.value,this.api.setHeaders(true)).subscribe(data => {
      this.form.form.area = data.json().area;
      console.log(data.json());
    },err => {
      console.log("Oops!");
    });
  }

  getAgeValues(event) {
    if( event.value.upper != 0) {
      this.ageUpper = event.value.upper;
    }
    if( event.value.lower != 0) {
      this.ageLower = event.value.lower;
    }
    console.log(event);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdvancedSearchPage');
  }

}
