import {Component} from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {ApiQuery} from '../../library/api-query';
import {Http} from '@angular/http';
import {RegistrationThreePage} from '../registration-three/registration-three'

/*
 Generated class for the RegistrationTwo page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
declare var $: any;

@Component({
    selector: 'page-registration',
    templateUrl: 'registration-two.html'
})

export class RegistrationTwoPage {

    public items = [];

    form: { form: any } = {
        form: {
            relationshipStatus: {choices: [[]]},
            region: {choices: [[]]},
            city: {choices: [[]]},
            religion: {choices: [[]]},
            education: {choices: [[]]},
            occupation: {choices: [[]]},
            purposes: {choices: [[]]},
            sexOrientation: {choices: [[]]},
            flow_signUp_step: {},
            flow_signUp_instance: {},

        }
    };

    err: {
        relationshipStatus: { errors: any },
        region: { errors: any },
        city: { errors: any },
        religion: { errors: any },
        education: { errors: any },
        occupation: { errors: any },
        purposes: { errors: any },
        sexOrientation: {errors: any},
        flow_signUp_step: { errors: any },
        flow_signUp_instance: { errors: any }
    } = {
        relationshipStatus: {errors: []},
        region: {errors: []},
        city: {errors: []},
        religion: {errors: []},
        education: {errors: []},
        occupation: {errors: []},
        purposes: {errors: []},
        sexOrientation: {errors: []},
        flow_signUp_step: {errors: []},
        flow_signUp_instance: {errors: []}
    };

    errKeys: any;
    field_value: any;
    user: { occupation: {} };
    name: any;
    allfields = '';

    public searchQuery: string = '';


    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public alertCtrl: AlertController,
                public http: Http,
                public api: ApiQuery) {

        let params = navParams.get('form');

        this.form.form = params;

        this.searchQuery = "";

    }

    formSubmit() {

        this.api.showLoad();

        let city = this.form.form.city.choices.findIndex(i => i.label === this.searchQuery);

        console.log(JSON.stringify(city));

        this.form.form.city.value = "";

        if (city != -1) {
            this.form.form.city.value = this.form.form.city.choices[city].value;
        }


        if (this.form.form.relationshipStatus.value == '' || this.form.form.region.value == '' || this.form.form.city.value == '' || this.form.form.religion.value == '' || this.form.form.education.value == '' || this.form.form.occupation.value == '' || this.form.form.purposes.value == '' || this.form.form.sexOrientation.value == '') {
            this.allfields = 'יש למלא את כל השדות המסומנים בכוכבית';
            this.api.hideLoad();
        }
        else {
            this.allfields = '';

            var data = JSON.stringify({
                flow_signUp_instance: this.form.form.flow_signUp_instance.value,
                flow_signUp_step: this.form.form.flow_signUp_step.value,
                signUpTwo: {
                    relationshipStatus: this.form.form.relationshipStatus.value,
                    region: this.form.form.region.value,
                    city: this.form.form.city.value,
                    religion: this.form.form.religion.value,
                    education: this.form.form.education.value,
                    occupation: this.form.form.occupation.value,
                    purposes: this.form.form.purposes.value,
                    sexOrientation: this.form.form.sexOrientation.value,
                    _token: this.form.form._token.value
                }

            });


            this.http.post(this.api.url + '/open_api/signs/ups', data, this.api.header).subscribe(data => this.validate(data.json()));
        }

    }

    validate(response) {

        if (typeof response.user.form.flow_signUp_step != 'undefined' && response.user.form.flow_signUp_step.value == 3) {

            this.navCtrl.push(RegistrationThreePage, {
                form: response.user.form
            });

        } else {

            this.err = response.user.errors.form.children;
            this.errKeys = Object.keys(this.err);
        }


        this.api.hideLoad();

    }

    selectCity(city) {
        this.searchQuery = city;
        $('.search').hide();
    }

    onKeydown() {
        if ($('ion-list.search:hidden')) {
            $('ion-list.search').show();
        }
    }

    getItems(ev) {
        // Reset items back to all of the items
        this.items = [];
        this.initializeItems();

        // set val to the value of the ev target
        var val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.items = this.items.filter((item) => {
                return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }
    }

    initializeItems() {

        var i = 0;

        for (let city of this.form.form.city.choices) {
            this.items.push(city.label);
            i++;
        }

    }

    presentPrompt(title) {

        if (title == 'Occupation') {
            this.name = 'occupation';
            //this.field_value = this.user.occupation;
            this.field_value = '234';

        }

        let alert = this.alertCtrl.create({
            title: title,
            inputs: [
                {
                    name: this.name,
                    placeholder: title,
                    //value:  this.field_value
                    value: this.form.form.occupation.value
                }

            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Ok',
                    handler: data => {
                        if (title == 'Occupation') {
                            console.log('test2: ' + title);
                            this.form.form.occupation.value = data.occupation;
                        }
                    }
                }
            ]
        });
        alert.present();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad EditProfilePage');
    }

}

