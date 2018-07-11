import {Component} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {ApiQuery} from '../../library/api-query';
import {Http} from '@angular/http';
import {Storage} from '@ionic/storage';

declare var $: any;


/*
 Generated class for the ContactUs page.
 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-contact-us',
    templateUrl: 'contact-us.html'
})
export class ContactUsPage {

    form: { form: any } = {form: {username: {}, subject: {}, email: {}, _token: {}, text: {}}};

    email_err: any;
    user_id: any;
    text_err: any;
    subject_err: any;
    allfields = '';
    public logged_in = false;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public http: Http,
                public api: ApiQuery,
                public storage: Storage,
                public toastCtrl: ToastController) {

        this.storage.get('password').then((val) => {
            if(val) {
                this.logged_in = true;
            }
        });

        this.storage.get('user_id').then((val) => {
            if(val) {
                this.user_id = val;
            }
        });

        this.http.get(api.url + '/app_dev.php/open_api/contact', api.header).subscribe(data => {
            this.form = data.json();

        }, err => {
            console.log("Oops!");
        });

    }

    formSubmit() {

        if ((this.form.form.email.value == '' && this.logged_in == false) || this.form.form.text.value == '' || this.form.form.subject.value == '') {
            this.allfields = 'יש למלא את כל השדות';
        } else {
            this.allfields = '';

            var params = JSON.stringify({
                contact: {
                    email: this.user_id ? this.user_id : this.form.form.email.value,
                    text: this.form.form.text.value,
                    subject: this.form.form.subject.value,
                    _token: this.form.form._token.value,
                }
            });

            this.http.post(this.api.url + '/open_api/contacts', params, this.api.header).subscribe(data => this.validate(data.json()));
        }

    }

    back() {
        //Keyboard.close();
        this.navCtrl.pop();
        setTimeout(function () {
            $('.scroll-content, .fixed-content').css({'margin-bottom': '57px'});
        }, 500);
    }

    validate(response) {
        this.email_err = response.errors.form.children.email.errors;
        this.subject_err = response.errors.form.children.subject.errors;
        this.text_err = response.errors.form.children.text.errors;

        if (response.send == true) {

            this.form.form.email.value = "";
            this.form.form.text.value = "";
            this.form.form.subject.value = "";

            const toast = this.toastCtrl.create({
                message: 'ההודעה נשלחה בהצלחה',
                showCloseButton: true,
                closeButtonText: 'אישור'
            });
            toast.present();
        }
    }

    ionViewWillEnter() {
        this.api.pageName = 'ContactUsPage';
    }
}