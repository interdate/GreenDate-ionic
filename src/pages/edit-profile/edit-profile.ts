import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, AlertController, Alert, Select, ToastController} from 'ionic-angular';
import {ApiQuery} from '../../library/api-query';
import {Http} from '@angular/http';
import {Storage} from '@ionic/storage';
import {deepCopy} from 'ionic-angular/util/util';
import {ChangePhotosPage} from '../change-photos/change-photos';

/*
 Generated class for the EditProfile page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */

declare var $: any;

@Component({
    selector: 'page-edit-profile',
    templateUrl: 'edit-profile.html'
})
export class EditProfilePage {
    private select: Select;
    public test: any = "First";
    public mydate: string = "";

    @ViewChild('select')
    public set ex(select: any | undefined) {
        this.select = select;
        if (select === undefined) return;
        select.open = this.open;
        if (select._options === undefined) {
            Object.defineProperty(select, '_options', {
                set: (val) => {
                    select['__options'] = val;
                    val.forEach(option => option.ionSelect.subscribe(d => {
                        this.test = d;
                        select.overlay.dismiss();
                    }));
                },
                get: function () {
                    return select['__options']
                }
            })
        }
    }



    /*form: { form: any } = {
        form: {
            submit: '',
            username: {},
            email: {first: {}, second: {}},
            password: {first: {}, second: {}},
            gender: {choices: [[]]},
            birthday: {value: {day: {}, month: {}, year: {}}},
            region: {choices: [[]]},
            area: {choices: [[]]},
            zipCode: {choices: [[]]},
            phone: {},
            agree: {},
            _token: {},
            body: {choices: [[]]},
            income: {},
            netWorth: {}
        }
    };*/

    form: { form: any } = {
        form: {
            username: {},
            email: {first: {}, second: {}},
            birthday: {value: {day: {}, month: {}, year: {}}},
            phone: {},
            _token: {}
        }
    };


    form_step_two: { form_step_two: any } = {
        form_step_two: {
            city: { choices: [[]] },
            education: { choices: [[]] },
            occupation: { choices: [[]] },
            purposes: { choices: [[]] },
            region: { choices: [[]] },
            relationshipStatus: { choices: [[]] },
            religion: { choices: [[]] },
            sexOrientation: { choices: [[]] },
            submit: '',
            _token: {}
        }
    };

    form_step_three: { form_step_three: any } = {
        form_step_three: {
            about: {},
            animals: { choices: [[]] },
            body: { choices: [[]] },
            children: { choices: [[]] },
            dinnerWith: {},
            drinking: { choices: [[]] },
            eyes: { choices: [[]] },
            favoriteBooks: {},
            favoriteDish: {},
            favoriteRestaurant: {},
            green:{ choices: [[]] },
            hair: { choices: [[]] },
            height: { choices: [[]] },
            interests: { choices: [[]] },
            looking:{},
            music:{},
            nutrition: { choices: [[]] },
            perfectDate:{},
            politicalAffiliation:{ choices: [[]] },
            smoking: { choices: [[]] },
            sport: { choices: [[]] },
            type: { choices: [[]] },
            veggieReasons: { choices: [[]] },
            _token: {}
            
        }
    };

    /*form_step_two: { form_step_two: any } = {
        form_step_two: {
            relationshipStatus: {choices: [[]]},
            ethnicity: {choices: [[]]},
            religion: {choices: [[]]},
            languages: {choices: [[]]},
            children: {choices: [[]]},
            education: {choices: [[]]},
            occupation: {},
            smoking: {choices: [[]]},
            drinking: {choices: [[]]},
            purposes: {choices: [[]]},
            height: {choices: [[]]},
            body: {choices: [[]]},
            eyes: {choices: [[]]},
            hair: {choices: [[]]},
            features: {choices: [[]]},
            status: {choices: [[]]},
            netWorth: {choices: [[]]},
            income: {choices: [[]]}
        }
    };*/

    /*form_step_three: { form_step_three: any } = {
        form_step_three: {
            username: {},
            email: {first: {}, second: {}},
            password: {first: {}, second: {}},
            gender: {choices: [[]]},
            birthday: {value: {day: {}, month: {}, year: {}}},
            region: {choices: [[]]},
            area: {choices: [[]]},
            zipCode: {choices: [[]]},
            phone: {},
            agree: {},
            _token: {},
            body: {choices: [[]]}
        }
    };*/

    err: {
        username: { errors: any },
        email: { first: { errors: any }, second: { errors: any } },
        birthday: { errors: any },
        phone: { errors: any },
        _token: { errors: any },
    } = {
        username: {errors: []},
        email: {first: {errors: []}, second: {errors: []}},
        birthday: {errors: []},
        phone: {errors: []},
        _token: {errors: []}
    };

    err_step_two: {
        city: { errors: any },
        education: { errors: any },
        occupation: { errors: any },
        purposes: { errors: any },
        region: { errors: any },
        relationshipStatus: { errors: any },
        religion: { errors: any },
        sexOrientation: { errors: any },
        _token: { errors: any }
    } = {
        city: { errors: '' },
        education: { errors: '' },
        occupation: { errors: '' },
        purposes: { errors: '' },
        region: { errors: '' },
        relationshipStatus: { errors: '' },
        religion: { errors: '' },
        sexOrientation: { errors: '' },
        _token: {errors: []}
    };

    err_step_three: {
            about: { errors: any },
            animals: { errors: any },
            body: { errors: any },
            children: { errors: any },
            dinnerWith: { errors: any },
            drinking: { errors: any },
            eyes: { errors: any },
            favoriteBooks: { errors: any },
            favoriteDish: { errors: any },
            favoriteRestaurant: { errors: any },
            green:{ errors: any },
            hair: { errors: any },
            height: { errors: any },
            interests: { errors: any },
            looking:{ errors: any },
            music:{ errors: any },
            nutrition: { errors: any },
            perfectDate:{ errors: any },
            politicalAffiliation:{ errors: any },
            smoking: { errors: any },
            sport: { errors: any },
            type: { errors: any },
            veggieReasons: { errors: any },
            _token: { errors: any }
    } = {
            about: { errors: [] },
            animals: { errors: [] },
            body: { errors: [] },
            children: { errors: [] },
            dinnerWith: { errors: [] },
            drinking: { errors: [] },
            eyes: { errors: [] },
            favoriteBooks: { errors: [] },
            favoriteDish: { errors: [] },
            favoriteRestaurant: { errors: [] },
            green:{ errors: [] },
            hair: { errors: [] },
            height: { errors: [] },
            interests: { errors: [] },
            looking:{ errors: [] },
            music:{ errors: [] },
            nutrition: { errors: [] },
            perfectDate:{ errors: [] },
            politicalAffiliation:{ errors: [] },
            smoking: { errors: [] },
            sport: { errors: [] },
            type: { errors: [] },
            veggieReasons: { errors: [] },
            _token: {errors: []}
    };

    errKeys: any;
    field_value: any;
    user: { username: any, email: any, email_retype: any, area: any, neighborhood: any,
        zip_code: any, phone: any, occupation: any, about_me: any, looking_for: any; body };
    name: any;
    step: any = 1;



    /*

    relationshipStatus: {errors: ''},
        children: {errors: ''},
        ethnicity: {errors: ''},
        religion: {errors: ''},
        languages: {errors: ''},
        education: {errors: ''},
        occupation: {errors: ''},
        smoking: {errors: ''},
        drinking: {errors: ''},
        purposes: {errors: ''},
        height: {errors: ''},
        body: {errors: ''},
        eyes: {errors: ''},
        hair: {errors: ''},
        features: {errors: ''},
        status: {errors: ''},
        netWorth: {errors: ''},
        income: {errors: ''},

        about: { errors: any },
        hobbies: { errors: any },
        looking: { errors: any },


        about: {errors: []},
        hobbies: {errors: []},
        looking: {errors: []},


        relationshipStatus: { errors: any },
        children: { errors: any },
        ethnicity: { errors: any },
        religion: { errors: any },
        languages: { errors: any },
        education: { errors: any },
        occupation: { errors: any },
        smoking: { errors: any },
        drinking: { errors: any },
        purposes: { errors: any },
        height: { errors: any },
        body: { errors: any },
        eyes: { errors: any },
        hair: { errors: any },
        features: { errors: any },
        status: { errors: any },
        netWorth: { errors: any },
        income: { errors: any },


        agree: {errors: []},
        region: {errors: []},
        area: {errors: []},
        zipCode: {errors: []},
        body: {errors: []}
        password: {children: {first: {errors: [[]]}, second: {errors: [[]]}}},
        gender: {errors: []},


        region: { errors: any },
        area: { errors: any },
        zipCode: { errors: any },
        agree: { errors: any },
        body: { errors: any },
        password: { children: { first: { errors: any }, second: { errors: any } } },
        gender: { errors: any },

    */

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public alertCtrl: AlertController,
                public http: Http,
                public api: ApiQuery,
                public toastCtrl: ToastController,
                public storage: Storage) {

        this.http.get(api.url + '/api/v1/edit/profile?step=' + this.step, api.setHeaders(true)).subscribe(data => {

            this.form = data.json();
            this.mydate = this.form.form.birthday.value.year+'-'+this.check2Numbers(this.form.form.birthday.value.month)+'-'+this.check2Numbers(this.form.form.birthday.value.day);
            console.log('Edit data', this.form);
            console.log('date', this.mydate);

        });
    }

    check2Numbers(number:string){
        if(number.length < 2){
          number = '0'+number;
        }
        return number;
    }

    open() {
        if ((<any>this)._disabled) {
            return;
        }

        // the user may have assigned some options specifically for the alert
        const selectOptions = deepCopy((<any>this).selectOptions);

        // make sure their buttons array is removed from the options
        // and we create a new array for the alert's two buttons
        selectOptions.buttons = [{
            text: (<any>this).cancelText,
            role: 'cancel',
            handler: () => {
                (<any>this).ionCancel.emit(null);
            }
        }];

        // if the selectOptions didn't provide a title then use the label's text
        if (!selectOptions.title && (<any>this)._item) {
            selectOptions.title = (<any>this)._item.getLabelText();
        }


        // default to use the alert interface
        (<any>this).interface = 'alert';

        // user cannot provide inputs from selectOptions
        // alert inputs must be created by ionic from ion-options
        selectOptions.inputs = (<any>this)._options.map(input => {
            return {
                type: ((<any>this)._multi ? 'checkbox' : 'radio'),
                label: input.text,
                value: input.value,
                checked: input.selected,
                disabled: input.disabled,
                handler: (selectedOption: any) => {
                    // Only emit the select event if it is being checked
                    // For multi selects this won't emit when unchecking
                    if (selectedOption.checked) {
                        input.ionSelect.emit(input.value);
                    }
                }
            };
        });

        var selectCssClass = 'select-alert';

        // create the alert instance from our built up selectOptions
        (<any>this).overlay = new Alert((<any>(<any>this))._app, selectOptions);

        if ((<any>this)._multi) {
            // use checkboxes
            selectCssClass += ' multiple-select-alert select-alertless';
        } else {
            // use radio buttons
            selectCssClass += ' single-select-alert select-alertless';
        }

        // If the user passed a cssClass for the select, add it
        selectCssClass += selectOptions.cssClass ? ' ' + selectOptions.cssClass : '';
        (<any>this).overlay.setCssClass(selectCssClass);

        (<any>this).overlay.addButton({
            text: (<any>this).okText,
            handler: (selectedValues: any) => {
                (<any>this).onChange(selectedValues);
                (<any>this).ionChange.emit(selectedValues);
            }
        });


        (<any>this).overlay.present(selectOptions);

        (<any>this)._isOpen = true;
        (<any>this).overlay.onDidDismiss(() => {
            (<any>this)._isOpen = false;
        });
    }

    changePhotosPage() {
        this.navCtrl.push(ChangePhotosPage);
    }

    step_edit(step) {

        this.http.get(this.api.url + '/api/v1/edit/profile?step=' + step, this.api.setHeaders(true)).subscribe(data => {
            if (step == 2) {
                this.form_step_two.form_step_two = data.json().form;
            } else if (step == 3) {
                this.form_step_three.form_step_three = data.json().form;
                //this.form_step_three.form_step_three.about.label
            }
            //console.log('Data Step', this.form);
            this.step = step;
        });
    }

    setSelected() {
        if (this.step == 1) {
            var params = JSON.stringify({
                profileOne: {
                    username: this.form.form.username.value,
                    email: {first: this.form.form.email.first.value, second: this.form.form.email.second.value},
                    birthday: this.form.form.birthday.value,
                    region: this.form.form.region.value,
                    area: this.form.form.area.value,
                    zipCode: this.form.form.zipCode.value,
                    phone: this.form.form.phone.value,
                    _token: this.form.form._token.value
                }
            });
        } else if (this.step == 2) {
            var params = JSON.stringify({
                profileTwo: {
                    relationshipStatus: this.form.form.relationshipStatus.value,
                    ethnicity: this.form.form.ethnicity.value,
                    religion: this.form.form.religion.value,
                    education: this.form.form.education.value,
                    languages: this.form.form.languages.value,
                    children: this.form.form.children.value,
                    occupation: this.form.form.occupation.value,
                    smoking: this.form.form.smoking.value,
                    drinking: this.form.form.drinking.value,
                    purposes: this.form.form.purposes.value,
                    height: this.form.form.height.value,
                    body: this.form.form.body.value,
                    eyes: this.form.form.eyes.value,
                    hair: this.form.form.hair.value,
                    features: this.form.form.features.value,
                    status: this.form.form.status.value,
                    netWorth: this.form.form.netWorth.value,
                    income: this.form.form.income.value,
                    _token: this.form.form._token.value
                }
            });
        } else if (this.step == 3) {
            var params = JSON.stringify({
                profileThree: {
                    about: this.form.form.about.value,
                    hobbies: this.form.form.hobbies.value,
                    looking: this.form.form.looking.value,
                    _token: this.form.form._token.value
                }
            });
        }

        //this.http.post(this.api.url+'/api/v1/edits/profiles',params, this.api.setHeaders(true)).subscribe(data => this.validate(data.json()));

    }

    festSelected(str) {
        var data = JSON.stringify({
            sign_up_one: {
                region: this.form.form.region.value,
                area: this.form.form.area.value
            }
        });

        this.http.post(this.api.url + '/open_api/signs/ups/helpers', data, this.api.header).subscribe(data => {
            this.setFormOptions(str, data.json());

            console.log(data.json);
        });
    }

    setFormOptions(str, data) {
        if (str == 'region') {
            this.form.form.area = data.form.area;
            console.log(this.form.form.area);
            this.form.form.zipCode = data.form.zipCode;
        } else if (str == 'area') {
            this.form.form.zipCode = data.form.zipCode;
            console.log(this.form.form.zipCode.options);
        }
    }

    /*
     presentPrompt(title) {


     if(title == 'Username') {
     this.name = 'username';
     this.field_value = this.user.username;
     }else if(title == 'Email') {
     this.name = 'email';
     this.field_value = this.user.email;
     }else if(title == 'Retype Email') {
     this.name = 'email_retype';
     this.field_value = this.user.email_retype;
     }else if( title == 'Area' ) {
     this.name = 'area';
     this.field_value = this.user.area;
     }else if(title == 'Neighborhood') {
     this.name = 'neighborhood';
     this.field_value = this.user.neighborhood;
     }else if(title == 'Zip Code') {
     this.name = 'zip_code';
     this.field_value = this.user.zip_code;
     }else if(title == 'Phone') {
     this.name = 'phone';
     this.field_value = this.user.phone;
     }else if(title == 'Occupation') {
     this.name = 'occupation';
     this.field_value = this.user.occupation;
     }else if(title == 'About Me'){
     this.name = 'about_me';
     this.field_value = this.user.looking_for;
     }
     else if(title == 'What Am I Looking For')
     {
     this.name = 'looking_for';
     this.field_value = this.user.looking_for;
     }

     let alert = this.alertCtrl.create({
     title: title,
     inputs: [
     {
     name: this.name,
     placeholder: title,
     value:  this.field_value
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
     text: 'Save',
     handler: data => {
     if(title == 'Username'){
     this.user.username = data.username;
     }else if(title == 'Email') {
     this.user.email = data.email;
     }else if( title == 'Retype Email') {
     this.user.email_retype = data.email_retype;
     }else if( title == 'Area' ) {
     this.user.area = data.area;
     }else if(title == 'Neighborhood') {
     this.user.neighborhood = data.neighborhood;
     }else if(title == 'Zip Code') {
     this.user.zip_code = data.zip_code;
     }else if(title == 'Phone') {
     this.user.phone = data.phone;
     }else if(title == 'Occupation') {
     this.user.occupation = data.occupation;
     }else if(title == 'About Me'){
     this.user.about_me = data.about_me;
     }else if(title == 'What Am I Looking For'){
     this.user.looking_for = data.looking_for;
     }
     console.log(data);
     console.log(title);
     }
     }
     ]
     });
     alert.present();
     }
     */
    presentPrompt(title) {

        if (title == 'Username') {
            this.name = 'username';
            this.field_value = this.form.form.username.value;
        } else if (title == 'Email') {
            this.name = 'email';
            this.field_value = this.form.form.email.first.value;
        } else if (title == 'Retype Email') {
            this.name = 'email_retype';
            this.field_value = this.form.form.email.second.value;
        } else if (title == 'Phone') {
            this.name = 'phone';
            this.field_value = this.form.form.phone.value;
        } else if (title == 'Password') {
            this.name = 'password';
            this.field_value = this.form.form.password.first.value;
        } else if (title == 'Retype Password') {
            this.name = 'retype_password';
            this.field_value = this.form.form.password.second.value;
        }

        let alert = this.alertCtrl.create({
            title: title,
            inputs: [
                {
                    name: this.name,
                    placeholder: title,
                    value: this.field_value
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
                    text: 'Save',
                    handler: data => {
                        if (title == 'Username') {
                            this.form.form.username.value = data.username;
                        } else if (title == 'Email') {
                            this.form.form.email.first.value = data.email;
                        } else if (title == 'Retype Email') {
                            this.form.form.email.second.value = data.email_retype;
                        } else if (title == 'Phone') {
                            this.form.form.phone.value = data.phone;
                        } else if (title == 'Password') {
                            this.form.form.password.first.value = data.password;
                        } else if (title == 'Retype Password') {
                            this.form.form.password.second.value = data.retype_password;
                        }
                        this.formSubmit();
                    }
                }
            ]
        });
        alert.present();
    }

    formSubmit() {

        if (this.step == 1) {

        console.log("step:"+this.step);

            var date_arr = ['', '', ''];

            if (typeof this.mydate != 'undefined') {
                date_arr = this.mydate.split('-');
            }
            var params = JSON.stringify({
                profileOne: {
                    username: this.form.form.username.value,
                    email: {first: this.form.form.email.first.value, second: this.form.form.email.second.value},
                    birthday: {
                        year: parseInt(date_arr[0]),
                        month: parseInt(date_arr[1]),
                        day: parseInt(date_arr[2])
                          
                    },
                    phone: this.form.form.phone.value,
                    _token: this.form.form._token.value
                }
            });
        } else if (this.step == 2) {
        console.log("step:"+this.step);

            /*var netWorth;
            var status;
            var income;

            if (typeof this.form_step_two.form_step_two.netWorth == 'undefined' &&
                typeof this.form_step_two.form_step_two.status == 'undefined' &&
                typeof this.form_step_two.form_step_two.income == 'undefined') {
                netWorth = '';
                status = '';
                income = '';
            } else {
                netWorth = this.form_step_two.form_step_two.netWorth.value;
                status = this.form_step_two.form_step_two.status.value;
                income = this.form_step_two.form_step_two.income.value;
            }*/

            var params = JSON.stringify({
                profileTwo: {
                    region: this.form_step_two.form_step_two.region.value,
                    city: this.form_step_two.form_step_two.city.value,
                    relationshipStatus: this.form_step_two.form_step_two.relationshipStatus.value,
                    occupation: this.form_step_two.form_step_two.occupation.value,
                    education: this.form_step_two.form_step_two.education.value,
                    religion: this.form_step_two.form_step_two.religion.value,
                    sexOrientation: this.form_step_two.form_step_two.sexOrientation.value,
                    purposes: this.form_step_two.form_step_two.purposes.value,
                    submit: this.form_step_two.form_step_two.submit,
                    _token: this.form_step_two.form_step_two._token.value
                }
            });
        } else if (this.step == 3) {
        console.log("step:"+this.step);
            var params = JSON.stringify({
                profileThree: {
                    about: this.form_step_three.form_step_three.about.value,
                    animals: this.form_step_three.form_step_three.animals.value,
                    body: this.form_step_three.form_step_three.body.value,
                    children: this.form_step_three.form_step_three.children.value,
                    dinnerWith: this.form_step_three.form_step_three.dinnerWith.value,
                    drinking: this.form_step_three.form_step_three.drinking.value,
                    eyes: this.form_step_three.form_step_three.eyes.value,
                    favoriteBooks: this.form_step_three.form_step_three.favoriteBooks.value,
                    favoriteDish: this.form_step_three.form_step_three.favoriteDish.value,
                    favoriteRestaurant: this.form_step_three.form_step_three.favoriteRestaurant.value,
                    green: this.form_step_three.form_step_three.green.value,
                    hair: this.form_step_three.form_step_three.hair.value,
                    height: this.form_step_three.form_step_three.height.value,
                    interests: this.form_step_three.form_step_three.interests.value,
                    looking: this.form_step_three.form_step_three.looking.value,
                    music: this.form_step_three.form_step_three.music.value,
                    nutrition: this.form_step_three.form_step_three.nutrition.value,
                    perfectDate: this.form_step_three.form_step_three.perfectDate.value,
                    politicalAffiliation: this.form_step_three.form_step_three.politicalAffiliation.value,
                    smoking: this.form_step_three.form_step_three.smoking.value,
                    sport: this.form_step_three.form_step_three.sport.value,
                    type: this.form_step_three.form_step_three.type.value,
                    veggieReasons: this.form_step_three.form_step_three.veggieReasons.value,
                    _token: this.form_step_three.form_step_three._token.value

                }
            });
        }

        this.http.post(this.api.url + '/api/v1/edits/profiles', params, this.api.setHeaders(true)).subscribe(data => this.validate(data.json()));
    }

    /*
        form-1
        region: this.form.form.region.value,
        area: this.form.form.area.value,
        zipCode: this.form.form.zipCode.value,

        form-3
        about: this.form_step_three.form_step_three.about.value,
        hobbies: this.form_step_three.form_step_three.hobbies.value,
        looking: this.form_step_three.form_step_three.looking.value,
        _token: this.form_step_three.form_step_three._token.value

        form-2
        languages: this.form_step_two.form_step_two.languages.value,
        children: this.form_step_two.form_step_two.children.value,
        height: this.form_step_two.form_step_two.height.value,
        body: this.form_step_two.form_step_two.body.value,
        eyes: this.form_step_two.form_step_two.eyes.value,
        hair: this.form_step_two.form_step_two.hair.value,
        features: this.form_step_two.form_step_two.features.value,
        status: status,
        netWorth: netWorth,
        income: income,
        smoking: this.form_step_two.form_step_two.smoking.value,
        drinking: this.form_step_two.form_step_two.drinking.value,
        ethnicity: this.form_step_two.form_step_two.ethnicity.value,


    */
    


          

    show_hint(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 3000
        });
        toast.present();
    }

    validate(response) {

        if (response.texts && response.texts.textSuccess) {
            this.show_hint(response.texts.textSuccess);
        }

        if (this.step == 1) {
            //this.err = response.errors.form.children;
            console.log('ERRORS',this.err);
            //this.errKeys = Object.keys(this.err_step_two);
        } else if (this.step == 2) {
            //this.err_step_two = response.errors.form.children;
            //this.errKeys = Object.keys(this.err_step_two);
        } else {
            //this.err_step_three = response.errors.form.children;
            //this.errKeys = Object.keys(this.err_step_three);
        }

        this.api.setStorageData({label: 'username', value: this.form.form.username.value});
        this.api.setHeaders(true, this.form.form.username.value, false);
    }
}
