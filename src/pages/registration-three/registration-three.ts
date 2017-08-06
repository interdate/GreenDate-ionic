import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { ApiQuery } from '../../library/api-query';
import {RegistrationFourPage} from "../registration-four/registration-four";

/*
 Generated class for the RegistrationThree page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */

declare var $:any;

@Component({
    selector: 'page-registration',
    templateUrl: 'registration-three.html',
    providers: [Storage]
})

export class RegistrationThreePage {

    user:any = {id: ''}
    allfields = '';

    form:{ form: any } = {
        form: {
            about: {},
            looking: {},
            smoking: { choices: [[]] },
            drinking: { choices: [[]] },
            children: { choices: [[]] },
            animals: { choices: [[]] },
            interests: { choices: [[]] },
            politicalAffiliation: { choices: [[]] },
            height: { choices: [[]] },
            body: { choices: [[]] },
            eyes: { choices: [[]] },
            hair: { choices: [[]] },
            perfectDate: {},
            favoriteDish: {},
            favoriteRestaurant: {},
            dinnerWith: {},
            favoriteBooks: {},
            music: {},
            type: { choices: [[]] },
            nutrition: { choices: [[]] },
            veggieReasons: { choices: [[]] },
            sport: { choices: [[]] },
            green: { choices: [[]] },
            flow_signUp_step: {},
            flow_signUp_instance: {},
            _token: {}
        }
    };

    err:{
            about: {errors: any},
            looking: { errors: any },
            green: { errors: any },
            smoking: { errors: any },
            drinking: { errors: any },
            children: { errors: any },
            animals: { errors: any },
            interests: { errors: any },
            politicalAffiliation: { errors: any },
            height: { errors: any },
            body: { errors: any },
            eyes: { errors: any },
            hair: { errors: any },
            perfectDate: { errors: any },
            favoriteDish: { errors: any },
            favoriteRestaurant: { errors: any },
            dinnerWith: { errors: any },
            favoriteBooks: { errors: any },
            music: { errors: any },
            type: { errors: any },
            nutrition: { errors: any },
            veggieReasons: { errors: any },
            sport: { errors: any },
            flow_signUp_step: { errors: any },
            flow_signUp_instance: { errors: any },
    } = {
            about: { errors: [] },
            looking: { errors: [] },
            green: { errors: [] },
            smoking: { errors: [] },
            drinking: { errors: [] },
            children: { errors: [] },
            animals: { errors: [] },
            interests: { errors: [] },
            politicalAffiliation: { errors: [] },
            height: { errors: [] },
            body: { errors: [] },
            eyes: { errors: [] },
            hair: { errors: [] },
            perfectDate: { errors: [] },
            favoriteDish: { errors: [] },
            favoriteRestaurant: { errors: [] },
            dinnerWith: { errors: [] },
            favoriteBooks: { errors: [] },
            music: { errors: [] },
            type: { errors: [] },
            nutrition: { errors: [] },
            veggieReasons: { errors: [] },
            sport: { errors: [] },
            flow_signUp_step: { errors: [] },
            flow_signUp_instance: { errors: [] },
    };

    errKeys:any;

    constructor(public navCtrl:NavController,
                public navParams:NavParams,
                public http:Http,
                public storage:Storage,
                public toastCtrl:ToastController,
                public api:ApiQuery,
                public alertCtrl:AlertController) {

        /*
         window.addEventListener('native.keyboardshow', function(){
         $('.footerMenu').hide();
         $('.scroll-content, .fixed-content').css({'margin-bottom': '58px'});

         let toast = this.toastCtrl.create({
         message: 'User was added successfully',
         duration: 3000
         });
         toast.present();

         });
         window.addEventListener('cdhide', function(){
         $('.footerMenu').show();
         $('.scroll-content, .fixed-concctent').css({'margin-bottom':'122px'});
         this.toast.dismiss();
         });
         */

        let params = navParams.get('form');

        this.form.form = params;

        console.log(this.form.form);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad RegistrationThreePage');
    }

    formSubmit() {

        //this.api.showLoad();

        var data = JSON.stringify({
            flow_signUp_instance: this.form.form.flow_signUp_instance.value,
            flow_signUp_step: this.form.form.flow_signUp_step.value,
            signUpTwo: {
            about: this.form.form.about.value,
            looking: this.form.form.looking.value,
            green: this.form.form.green.value,
            smoking: this.form.form.smoking.value,
            drinking: this.form.form.drinking.value,
            children: this.form.form.children.value,
            animals: this.form.form.animals.value,
            interests: this.form.form.interests.value,
            politicalAffiliation: this.form.form.politicalAffiliation.value,
            height: this.form.form.height.value,
            body: this.form.form.body.value,
            eyes: this.form.form.eyes.value,
            hair: this.form.form.hair.value,
            perfectDate: this.form.form.perfectDate.value,
            favoriteDish: this.form.form.favoriteDish.value,
            favoriteRestaurant: this.form.form.favoriteRestaurant.value,
            dinnerWith: this.form.form.dinnerWith.value,
            favoriteBooks: this.form.form.favoriteBooks.value,
            music: this.form.form.music.value,
            type: this.form.form.type.value,
            nutrition: this.form.form.nutrition.value,
            veggieReasons: this.form.form.veggieReasons.value,
            sport: this.form.form.sport.value,
            _token: this.form.form._token.value
            }
        });

        this.http.post(this.api.url + '/open_api/signs/ups', data, this.api.header)
            .subscribe(data => {
                this.validate(data.json())
            }, err => {
                alert(JSON.stringify(err));
            });
    }

    validate(response) {

     if(this.form.form.about.value == '' || this.form.form.looking.value == '' || this.form.form.green.value == '' || this.form.form.smoking.value == '' || this.form.form.drinking.value == '' || this.form.form.children.value == '' || this.form.form.animals.value == '' || this.form.form.interests.value == '' || this.form.form.politicalAffiliation.value == '' || this.form.form.height.value == '' || this.form.form.body.value == '' || this.form.form.eyes.value == '' || this.form.form.hair.value == '' || this.form.form.type.value == '' || this.form.form.nutrition.value == '' || this.form.form.veggieReasons.value == '' || this.form.form.sport.value == ''){
           this.allfields = 'יש למלאות את כל השדות המסומנות ב*';
           }else{
           this.allfields = '';

            if (typeof response.user != 'undefined' && typeof response.user.form.flow_signUp_step != 'undefined' && response.user.form.flow_signUp_step.value == 3) {
            console.log('Response1: ', response);

            this.err = response.user.errors.form.children;
            this.errKeys = Object.keys(this.err);
            /*this.navCtrl.push(RegistrationThreePage, {
             form: response.user.form
             });
             */
        } else {


            //let user = this.api.getUserData();

            //this.storage.set('username', user.username );
            //this.storage.set('password', user.password);
            this.storage.set('status', response.status);
            this.storage.set('user_id', response.id);
            this.storage.set('user_photo', response.photo);

            //this.api.setHeaders(true, user.username, user.password );

            console.log('Response2: ', response);
            if (response.status == 'no_photo') {
                this.user.id = response.id;
                this.storage.get('user_data').then((val) => {
                    this.navCtrl.push(RegistrationFourPage, {
                        gender: 0,
                        user: this.user,
                        username: val.username,
                        password: val.password,
                        new_user: response.texts.register_end_button
                    });
                });
            }
            if (response.status == 'not_activated') {
                this.storage.get('user_data').then((val) => {
                    this.storage.set('username', val.username);
                    this.storage.set('password', val.password);
                    this.api.setHeaders(true, val.username, val.password);
                    this.navCtrl.push(RegistrationFourPage, {
                        gender: 1,
                        user: this.user,
                        username: val.username,
                        password: val.password,
                        //new_user: response.texts.register_end_button
                    });
                });

            }


        }




           }


        this.api.hideLoad();
    }

}
