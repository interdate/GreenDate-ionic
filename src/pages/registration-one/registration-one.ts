import {Component} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {ApiQuery} from '../../library/api-query';
import {Http} from '@angular/http';
import {RegistrationTwoPage} from '../registration-two/registration-two';
import {Storage} from '@ionic/storage';
import {PagePage} from '../page/page';


/*
 Generated class for the One page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */


@Component({
    selector: 'page-registration',
    templateUrl: 'registration-one.html',
    providers: [Storage]
})

export class RegistrationOnePage {

    form: { form: any } = {
        form: {
            username: {},
            email: {first: {}, second: {}},
            password: {first: {}, second: {}},
            gender: {choices: [[]]},
            birthday: {value: {day: {}, month: {}, year: {}}},
            phone: {},
            agree: {},
            _token: {},
            flow_signUp_step: 1
        }
    };
    err: {
        username: { errors: any },
        email: { children: { first: { errors: any }, second: { errors: any } } },
        password: { children: { first: { errors: any }, second: { errors: any } } },
        gender: { errors: any },
        birthday: { errors: any },
        phone: { errors: any },
        agree: { errors: any },
        _token: { errors: any },
        flow_signUp_step: { errors: any }
    } = {
        username: {errors: []},
        email: {children: {first: {errors: []}, second: {errors: []}}},
        password: {children: {first: {errors: []}, second: {errors: []}}},
        gender: {errors: []},
        birthday: {errors: []},
        phone: {errors: []},
        agree: {errors: []},
        _token: {errors: []},
        flow_signUp_step: {errors: []}
    };
    errKeys: any;
    field_value: any;
    user: { region: any, username: any, email: any, email_retype: any, area: any, neighborhood: any, zip_code: any, phone: any, occupation: any, about_me: any, looking_for: any };
    //user: { username: any, email: any, phone: any, password: any, gender:any, birthday:any, agree:any};
    name: any;
    birth: any;
    username_err: any;
    email_first_err: any;
    email_second_err: any;
    password_first_err: any;
    password_second_err: any;
    gender_err: any;
    birthday_err: any;
    agree_err: any;
    phone_err: any;
    allfields = '';

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public alertCtrl: AlertController,
                public http: Http,
                public api: ApiQuery,
                private sanitizer: DomSanitizer,
                public storage: Storage) {

        this.storage = storage;

        this.http.get(api.url + '/open_api/sign/up', api.header).subscribe(data => {
            this.form = data.json();
            this.form.form.agree.value = false;
            this.form.form.agree.label = sanitizer.bypassSecurityTrustHtml(this.form.form.agree.label);
        }, err => {
            console.log("Oops!");
        });

    }

    getPage(id) {
        this.navCtrl.push(PagePage, {id: id});
    }

    formSubmit() {

        this.api.showLoad();

        if (this.form.form.username.value == '' || this.form.form.email.first.value == '' || this.form.form.email.second.value == '' || this.form.form.password.first.value == '' || this.form.form.password.second.value == '' || this.form.form.gender.value == '' || this.form.form.birthday.value == undefined) {
            this.allfields = 'יש למלא את כל השדות המסומנים בכוכבית';
            this.api.hideLoad();

            //console.log("name: "+this.form.form.username.value +" email-1: "+ this.form.form.email.first.value +" email-2:  " +this.form.form.email.second.value + " pass-1: "+ this.form.form.password.first.value +" pass-2: "+ this.form.form.password.second.value + " gender: " +this.form.form.gender.value + " birtthday: "+this.form.form.birthday.value);

        } else if (this.form.form.agree.value == false) {
            this.allfields = 'יש לאשר את תנאי השימוש';
            this.api.hideLoad();
        }
        else {
            this.allfields = '';


            this.storage.set('user_data', {
                username: this.form.form.username.value,
                password: this.form.form.password.first.value
            });

            this.api.setUserData({
                username: this.form.form.username.value,
                password: this.form.form.password.first.value
            });

            var date_arr = ['', '', ''];

            if (typeof this.birth != 'undefined') {
                date_arr = this.birth.split('-');
            }

            var data = JSON.stringify({

                signUpOne: {
                    username: this.form.form.username.value,
                    email: {
                        first: this.form.form.email.first.value,
                        second: this.form.form.email.second.value
                    },
                    password: {
                        first: this.form.form.password.first.value,
                        second: this.form.form.password.second.value
                    },
                    gender: this.form.form.gender.value,
                    birthday: {
                        day: parseInt(date_arr[2]),
                        month: parseInt(date_arr[1]),
                        year: parseInt(date_arr[0])
                    },
                    phone: this.form.form.phone.value,
                    agree: this.form.form.agree.value,
                    _token: this.form.form._token.value
                }
            });

            this.http.post(this.api.url + '/open_api/signs/ups', data, this.api.header).subscribe(data => this.validate(data.json()));
        }

    }

    validate(response) {

        if (typeof response.user.form.flow_signUp_step != 'undefined' && response.user.form.flow_signUp_step.value == 2) {

            this.navCtrl.push(RegistrationTwoPage, {
                form: response.user.form
            });

        } else {

            this.err = response.user.errors.form.children;
            this.errKeys = Object.keys(this.err);
            this.err.username.errors;
        }


        this.api.hideLoad();
    }

    ionViewDidLoad() {
    }

}
