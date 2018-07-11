import {Component, ViewChild} from '@angular/core';
import {
    Platform,
    MenuController,
    Nav,
    ViewController,
    ToastController,
    Content,
    AlertController,
    Events
} from 'ionic-angular';
import {StatusBar, Push, Splashscreen, AppVersion, Geolocation, Market} from 'ionic-native';
import {Http} from '@angular/http';
import {HelloIonicPage} from '../pages/hello-ionic/hello-ionic';
import {ChangePasswordPage} from '../pages/change-password/change-password';
import {SearchPage} from '../pages/search/search';
import {LoginPage} from '../pages/login/login';
import {ChangePhotosPage} from '../pages/change-photos/change-photos';
import {EditProfilePage} from '../pages/edit-profile/edit-profile';
import {ContactUsPage} from '../pages/contact-us/contact-us';
import {ProfilePage} from '../pages/profile/profile';
import {SettingsPage} from '../pages/settings/settings';
import {FreezeAccountPage} from '../pages/freeze-account/freeze-account';
import {ArenaPage} from '../pages/arena/arena';
import {InboxPage} from '../pages/inbox/inbox';
import {NotificationsPage} from '../pages/notifications/notifications';
import {RegistrationOnePage} from '../pages/registration-one/registration-one';
import {DialogPage} from '../pages/dialog/dialog';
import {BingoPage} from '../pages/bingo/bingo';
import {PasswordRecoveryPage} from '../pages/password-recovery/password-recovery';
import {ActivationPage} from '../pages/activation/activation';
import {PagePage} from '../pages/page/page';
import {ApiQuery} from '../library/api-query';
import {Storage} from '@ionic/storage';
import {RegistrationFourPage} from "../pages/registration-four/registration-four";
import {FaqPage} from "../pages/faq/faq";
import {RegistrationThreePage} from "../pages/registration-three/registration-three";
import {AdvancedSearchPage} from "../pages/advanced-search/advanced-search";
import {RegistrationTwoPage} from "../pages/registration-two/registration-two";

declare var $: any;

@Component({
    templateUrl: 'app.html',
    providers: [Storage, Geolocation]
})
export class MyApp {

    @ViewChild(Nav) nav: Nav;
    @ViewChild(ViewController) viewCtrl: ViewController;
    @ViewChild(Content) content: Content;

    // make HelloIonicPage the root (or first) page
    rootPage: any;
    banner: {src: string; link: string};
    menu_items_logout: Array<{_id: string, icon: string, title: string, count: any, component: any}>;
    menu_items_login: Array<{_id: string, icon: string, title: string, count: any, component: any}>;
    menu_items: Array<{_id: string, icon: string, title: string, count: any, component: any}>;
    menu_items_settings: Array<{_id: string, icon: string, title: string, count: any, component: any}>;
    menu_items_contacts: Array<{_id: string, list: string, icon: string, title: string, count: any, component: any}>;
    menu_items_footer1: Array<{_id: string, src_img: string, list: string, icon: string, count: any, title: string, component: any}>;
    menu_items_footer2: Array<{_id: string, src_img: string, list: string, icon: string, title: string, count: any, component: any}>;

    //deviceToken: any;
    activeMenu: string;
    username: any;
    back: string;

    is_login: any = false;
    status: any = '';
    texts: any = {};
    new_message: any = '';
    message: any = {};
    avatar: string = '';
    stats: string = '';
    interval: any = true;


    constructor(public platform: Platform,
                public menu: MenuController,
                public http: Http,
                public api: ApiQuery,
                public storage: Storage,
                public toastCtrl: ToastController,
                private geolocation: Geolocation,
                public alertCtrl: AlertController,
                public events: Events) {

        this.storage = storage;


        this.http.get(api.url + '/open_api/menu', api.header).subscribe(data => {

            let menu = data.json().menu;
            this.initMenuItems(menu);

            this.storage.get('user_id').then((val) => {
                this.initPushNotification();
                if (!val) {
                    this.rootPage = LoginPage;
                    this.menu_items = this.menu_items_logout;
                } else {
                    this.menu_items = this.menu_items_login;
                    this.getBingo();
                    this.rootPage = HelloIonicPage;
                }
            });

        });

        this.closeMsg();
        var that = this;
        setInterval(function () {
            let page = that.nav.getActive();
            if (!(page.instance instanceof LoginPage) && that.api.username != false && that.api.username != null) {
                that.getBingo();
                // New Message Notification
                that.getMessage();
            }

        }, 10000);

        this.initializeApp();
        this.menu1Active();

    }

    closeMsg() {
        this.new_message = '';
    }

    /**
     *  Set User's Current Location
     */
    setLocation() {

        Geolocation.getCurrentPosition().then(pos => {
            console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
            var params = JSON.stringify({
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude
            });

            this.http.post(this.api.url + '/api/v1/locations', params, this.api.setHeaders(true)).subscribe(data => {
            });
        });
    }

    getStatistics() {
        this.http.get(this.api.url + '/api/v1/statistics', this.api.setHeaders(true)).subscribe(data => {

            let statistics = data.json().statistics;

            // First Sidebar Menu
            this.menu_items[2].count = statistics.newNotificationsNumber;
            this.menu_items[0].count = statistics.newMessagesNumber;
            // Contacts Sidebar Menu
            this.menu_items_contacts[0].count = statistics.viewed;
            this.menu_items_contacts[1].count = statistics.viewedMe;
            this.menu_items_contacts[2].count = statistics.connected;
            this.menu_items_contacts[3].count = statistics.connectedMe;
            this.menu_items_contacts[4].count = statistics.favorited;
            this.menu_items_contacts[5].count = statistics.favoritedMe;
            this.menu_items_contacts[6].count = statistics.blacklisted;
            //Footer Menu
            this.menu_items_footer2[2].count = statistics.newNotificationsNumber;
            this.menu_items_footer2[2].count = 0;
            this.menu_items_footer1[3].count = statistics.newMessagesNumber;
            this.menu_items_footer2[0].count = statistics.favorited;
            this.menu_items_footer2[1].count = statistics.favoritedMe;

            this.bannerStatus();

        }, err => {
            this.clearLocalStorage();
        });
    }


    bannerStatus() {
        let page = this.nav.getActive();


        if (this.api.pageName == 'DialogPage' || this.api.pageName == 'EditProfilePage'
            || this.api.pageName == 'SearchPage' || this.api.pageName == AdvancedSearchPage
            || this.api.pageName == 'RegistrationTwoPage' || this.api.pageName == 'RegistrationThreePage'
            || this.api.pageName == 'RegistrationFourPage' || this.api.pageName == 'ArenaPage'
            || this.api.pageName == 'ChangePhotosPage' || this.api.pageName == 'ProfilePage' || this.is_login == false) {
            $('.link-banner').hide();
        }
        else if (this.api.pageName == 'LoginPage') {
            $('.link-banner').hide();
        } else if (this.api.pageName == 'HelloIonicPage') {
            $('.link-banner').show();
        }
        else {
            $('.link-banner').show();
        }

        console.log('Test '+ this.api.pageName);
    }


    clearLocalStorage() {
        this.api.setHeaders(false, null, null);
        // Removing data storage
        this.storage.remove('status');
        this.storage.remove('password');
        this.storage.remove('user_id');
        this.storage.remove('user_photo');

        this.nav.push(LoginPage);
    }

    initMenuItems(menu) {

        this.back = menu.back;

        this.stats = menu.stats;

        this.menu_items_logout = [
            {_id: '', icon: 'log-in', title: menu.login, component: LoginPage, count: ''},
            {_id: 'blocked', icon: '', title: menu.forgot_password, component: PasswordRecoveryPage, count: ''},
            {_id: '', icon: 'mail', title: menu.contact_us, component: ContactUsPage, count: ''},
            {_id: '', icon: 'person-add', title: menu.join_free, component: RegistrationOnePage, count: ''},
        ];

        this.menu_items = [
            {_id: 'inbox', icon: '', title: menu.inbox, component: InboxPage, count: ''},
            {_id: 'the_area', icon: '', title: menu.the_arena, component: ArenaPage, count: ''},
            {_id: 'notifications', icon: '', title: menu.notifications, component: NotificationsPage, count: ''},
            {_id: 'stats', icon: 'stats', title: menu.contacts, component: ProfilePage, count: ''},
            {_id: '', icon: 'search', title: menu.search, component: SearchPage, count: ''},
            {_id: '', icon: 'information-circle', title: 'שאלות נפוצות', component: FaqPage, count: ''},
        ];

        this.menu_items_login = [
            {_id: 'inbox', icon: '', title: menu.inbox, component: InboxPage, count: ''},
            {_id: 'the_area', icon: '', title: menu.the_arena, component: ArenaPage, count: ''},
            {_id: 'notifications', icon: '', title: menu.notifications, component: NotificationsPage, count: ''},
            {_id: 'stats', icon: 'stats', title: menu.contacts, component: ProfilePage, count: ''},
            {_id: '', icon: 'search', title: menu.search, component: SearchPage, count: ''},
            {_id: '', icon: 'information-circle', title: 'שאלות נפוצות', component: FaqPage, count: ''},
            {_id: '', icon: 'mail', title: menu.contact_us, component: ContactUsPage, count: ''},
        ];

        this.menu_items_settings = [
            {_id: 'edit_profile', icon: '', title: menu.edit_profile, component: EditProfilePage, count: ''},
            {_id: 'edit_photos', icon: '', title: menu.edit_photos, component: ChangePhotosPage, count: ''},
            {_id: '', icon: 'person', title: menu.view_my_profile, component: ProfilePage, count: ''},
            {_id: 'change_password', icon: '', title: menu.change_password, component: ChangePasswordPage, count: ''},
            {_id: 'freeze_account', icon: '', title: menu.freeze_account, component: FreezeAccountPage, count: ''},
            {_id: 'settings', icon: 'cog', title: menu.settings, component: SettingsPage, count: ''},
            {_id: '', icon: 'mail', title: menu.contact_us, component: ContactUsPage, count: ''},
            {_id: 'logout', icon: 'log-out', title: menu.log_out, component: LoginPage, count: ''}
        ];


        this.menu_items_contacts = [
            {_id: 'viewed', icon: '', title: menu.viewed, component: HelloIonicPage, list: 'viewed', count: ''},
            {
                _id: 'viewed_me',
                icon: '',
                title: menu.viewed_me,
                component: HelloIonicPage,
                list: 'viewed_me',
                count: ''
            },
            {
                _id: 'contacted',
                icon: '',
                title: menu.contacted,
                component: HelloIonicPage,
                list: 'connected',
                count: ''
            },
            {
                _id: 'contacted_me',
                icon: '',
                title: menu.contacted_me,
                component: HelloIonicPage,
                list: 'connected_me',
                count: ''
            },
            {
                _id: 'favorited',
                icon: '',
                title: menu.favorited,
                component: HelloIonicPage,
                list: 'favorited',
                count: ''
            },
            {
                _id: 'favorited_me',
                icon: '',
                title: menu.favorited_me,
                component: HelloIonicPage,
                list: 'favorite_me',
                count: ''
            },
            {_id: '', icon: 'lock', title: menu.blocked, component: HelloIonicPage, list: 'black', count: ''}
        ];

        this.menu_items_footer1 = [
            {
                _id: 'online',
                src_img: 'img/icons/online.png',
                icon: '',
                list: 'online',
                title: menu.online,
                component: HelloIonicPage,
                count: ''
            },
            {
                _id: 'viewed',
                src_img: 'img/icons/the-arena.png',
                icon: '',
                list: 'viewed',
                title: menu.the_arena,
                component: ArenaPage,
                count: ''
            },
            {
                _id: 'near-me',
                src_img: '',
                title: 'קרוב אלי',
                list: 'distance',
                icon: 'pin',
                component: HelloIonicPage,
                count: ''
            },
            {
                _id: 'inbox',
                src_img: 'img/icons/inbox.png',
                icon: '',
                list: '',
                title: menu.inbox,
                component: InboxPage,
                count: ''
            },
        ];

        this.menu_items_footer2 = [
            {
                _id: '',
                src_img: 'img/icons/favorited.png',
                icon: '',
                list: 'favorited',
                title: menu.favorited,
                component: HelloIonicPage,
                count: ''
            },
            {
                _id: '',
                src_img: 'img/icons/favorited_me.png',
                icon: '',
                list: 'favorite_me',
                title: menu.favorited_me,
                component: HelloIonicPage,
                count: ''
            },
            {
                _id: 'notifications',
                src_img: 'img/icons/notifications_ft.png',
                list: '',
                icon: '',
                title: menu.notifications,
                component: NotificationsPage,
                count: ''
            },
            {_id: '', src_img: '', icon: 'search', title: menu.search, list: '', component: SearchPage, count: ''},
        ];
    }


    menu1Active(bool = true) {
        this.activeMenu = 'menu1';
        this.menu.enable(true, 'menu1');
        this.menu.enable(false, 'menu2');
        this.menu.enable(false, 'menu3');
        if (bool) {
            this.menu.toggle();
        }
    }


    menu2Active() {
        this.activeMenu = 'menu2';
        this.menu.enable(false, 'menu1');
        this.menu.enable(true, 'menu2');
        this.menu.enable(false, 'menu3');
        this.menu.open();
    }


    menu3Active() {
        this.activeMenu = 'menu3';
        this.menu.enable(false, 'menu1');
        this.menu.enable(false, 'menu2');
        this.menu.enable(true, 'menu3');
        this.menu.toggle();
    }


    menuCloseAll() {
        if (this.activeMenu != 'menu1') {
            this.menu.toggle();
            this.activeMenu = 'menu1';
            this.menu.enable(true, 'menu1');
            this.menu.enable(false, 'menu2');
            this.menu.enable(false, 'menu3');
            this.menu.close();
            this.menu.toggle();
        }
    }


    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need
            StatusBar.styleDefault();
            Splashscreen.hide();
        });
    }


    initPushNotification() {
        //alert(123);
        if (!this.platform.is('cordova')) {
            console.warn("Push notifications not initialized. Cordova is not available - Run in physical device");
            return;
        }
        let push = Push.init({
            android: {
                senderID: "72562107329"
            },
            ios: {
                alert: "true",
                badge: false,
                sound: "true"
            },
            windows: {}
        });

        push.on('registration', (data) => {
            //this.deviceToken = data.registrationId;
            this.storage.set('deviceToken', data.registrationId);
            console.log("device token ->", data.registrationId);
            this.api.sendPhoneId(data.registrationId);
            //TODO - send device token to server
        });

        push.on('notification', (data) => {
            let self = this;
            //if user using app and push notification comes
            if (data.additionalData.foreground == false) {
                this.storage.get('user_id').then((val) => {
                    if (val) {
                        self.nav.push(InboxPage);
                    } else {
                        this.nav.push(LoginPage);
                    }
                });

            }
        });
    }


    swipeFooterMenu() {
        if ($('.more-btn').hasClass('menu-left')) {
            $('.more-btn').removeClass('menu-left');
            $('.more-btn .right-arrow').show();
            $('.more-btn .left-arrow').hide();

            $('.more-btn').parents('.menu-one').animate({
                'margin-right': '-92%'
            }, 1000);
        } else {
            $('.more-btn').addClass('menu-left');
            $('.more-btn .left-arrow').show();
            $('.more-btn .right-arrow').hide();
            $('.more-btn').parents('.menu-one').animate({
                'margin-right': '0'
            }, 1000);
        }
    }


    removeBackground() {
        $('#menu3, #menu2').find('ion-backdrop').remove();
    }

    getBanner() {
        this.http.get(this.api.url + '/open_api/banner', this.api.header).subscribe(data => {
            this.banner = data.json().banner;
        });
    }

    goTo() {
        window.open(this.banner.link, '_blank');
        return false;
    }

    openPage(page) {
        if (page._id == 'logout') {
            this.status = '';
        }

        if (page._id == 'stats') {
            this.menu3Active();
        } else {
            // close the menu when clicking a link from the menu
            this.menu.close();

            let params = '';

            // navigate to the new page if it is not the current page
            if (page.list == 'online') {
                params = JSON.stringify({
                    action: 'online'
                });
            } else if (page.list == 'distance') {
                params = JSON.stringify({
                    action: 'search',
                    filter: page.list
                });
            }

            else {

                params = JSON.stringify({
                    action: 'list',
                    list: page.list
                });
            }

            this.nav.push(page.component, {page: page, action: 'list', params: params});
        }
    }


    homePage() {
        this.storage.get('user_id').then((val) => {
            if (val) {
                this.nav.push(HelloIonicPage);
            } else {
                this.nav.push(LoginPage);
            }
        });
    }


    getBingo() {
        this.storage.get('user_id').then((val) => {
            if (val) {
                this.http.get(this.api.url + '/app_dev.php/api/v1/bingo', this.api.setHeaders(true)).subscribe(data => {
                    this.storage.set('status', this.status);
                    this.avatar = data.json().texts.photo;
                    this.texts = data.json().texts;
                    // DO NOT DELETE
                    if (this.status != data.json().status) {
                        this.status = data.json().status;
                        this.checkStatus();
                    } else {
                        this.status = data.json().status;
                    }
                    if (data.json().user) {
                        this.nav.push(BingoPage, {data: data.json()});
                        this.http.get(this.api.url + '/app_dev.php/api/v1/bingo?likeMeId=' + data.json().user.id, this.api.setHeaders(true)).subscribe(data => {
                        });
                    }
                });
            }
        });
    }

    dialogPage() {
        let user = {id: this.new_message.userId};
        this.closeMsg();
        this.nav.push(DialogPage, {user: user});
    }

    getMessage() {
        let page = this.nav.getActive();
        this.http.get(this.api.url + '/api/v1/new/messages', this.api.setHeaders(true)).subscribe(data => {

            if ((this.new_message == '' || typeof this.new_message == 'undefined') && !(this.api.pageName == 'DialogPage')) {
                this.new_message = data.json().messages[0];
                if (typeof this.new_message == 'object') {
                    this.http.get(this.api.url + '/api/v1/messages/notify?message_id=' + this.new_message.id, this.api.setHeaders(true)).subscribe(data => {
                    });
                }
            }

            this.message = data.json();

            this.menu_items[2].count = data.json().newNotificationsNumber;
            this.menu_items[0].count = data.json().newMessagesNumber;
            this.menu_items_footer2[2].count = data.json().newNotificationsNumber;
            this.menu_items_footer1[3].count = data.json().newMessagesNumber;
        });
    }

    checkStatus() {
        let page = this.nav.getActive();

        if (!(this.api.pageName == 'ActivationPage') && !(this.api.pageName == 'ContactUsPage') && !(this.api.pageName == 'ChangePhotosPage') && !(this.api.pageName == 'RegistrationThreePage')
            && !(this.api.pageName == 'RegistrationFourPage') && !(this.api.pageName == 'PagePage')) {
            if (this.status == 'no_photo') {

                let toast = this.toastCtrl.create({
                    message: this.texts.photoMessage,
                    showCloseButton: true,
                    closeButtonText: 'אישור'
                });
                if (this.texts.photoMessage) {
                    toast.present();
                }
                //alert(page);
                this.nav.push(RegistrationFourPage);
            } else if (this.status == 'not_activated') {
                this.nav.push(ActivationPage);
            }
        }
        if (((this.api.pageName == 'ActivationPage') && this.status == 'login')) {
            this.nav.push(HelloIonicPage);
        }
    }

    alert(title, subTitle) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: subTitle,
            buttons: [{
                text: 'אישור',
                handler: data => {
                    Market.open('com.nysd');
                }
            }]
        });
        alert.present();
    }

    getAppVersion() {
        this.http.get(this.api.url + '/open_api/version', this.api.header).subscribe(data => {
            console.log(data.json());
            if (this.platform.is('cordova')) {
                AppVersion.getVersionNumber().then((s) => {
                    if (data.json() != s) {
                        window.open('market://details?id=com.nyrd', '_system');
                    } else {
                        //alert('test2');
                    }
                })
            }
        });
    }

    ngAfterViewInit() {

        this.nav.viewDidEnter.subscribe((view) => {

            this.getBanner();
            this.getAppVersion();

            this.events.subscribe('statistics:updated', () => {
                // user and time are the same arguments passed in `events.publish(user, time)`
                this.getStatistics();
            });

            let page = this.nav.getActive();

            if (this.api.pageName == 'HelloIonicPage') {
                if (this.api.status != '') {
                    this.status = this.api.status;
                }
                this.setLocation();
            }

            if (this.api.pageName == 'DialogPage') {
                $('.footerMenu').hide();
            } else {
                if (this.api.footer == true) {
                    $('.footerMenu').show();
                }
            }

            let el = this;
            window.addEventListener('native.keyboardshow', function () {
                //let page = el.nav.getActive();
                //this.keyboard.disabledScroll(true);

                $('.link-banner').hide();
                $('.footerMenu, .back-btn').hide();
                $('.back-btn').hide();


                if (this.api.pageName == 'DialogPage') {
                    $('.banner').hide();

                    setTimeout(function () {
                        //$('.scroll-content, .fixed-content').css({'margin-bottom': '57px'});
                        //$('.form-dialog').css({'margin-bottom': '-20px'});
                    }, 200);
                } else {
                    //$('.banner').show();
                    setTimeout(function () {
                        $('.scroll-content, .fixed-content').css({'margin-bottom': '0px'});
                    }, 200);

                }

            });
            window.addEventListener('native.keyboardhide', function () {
                //let page = el.nav.getActive();
                //$('.footerMenu, .back-btn').show();

                this.bannerStatus();

                if (el.api.pageName == 'DialogPage') {
                    $('.back-btn').show();
                    $('.footerMenu').hide();
                    setTimeout(function () {
                        //$('.scroll-content, .fixed-content').css({'margin-bottom': '115px'});
                        $('.scroll-content, .fixed-content').css({'margin-bottom': '57px'});
                        el.content.scrollTo(0, 999999, 300);
                    }, 600);
                } else {
                    $('.footerMenu, .back-btn').show();
                    setTimeout(function () {
                        $('.scroll-content, .fixed-content').css({'margin-bottom': '0px'});
                    }, 500);
                }

            });

            if (el.api.pageName == 'LoginPage') {
                //clearInterval(this.interval);
                this.interval = false;
                //this.avatar = '';
            }
            if (el.api.pageName == 'HelloIonicPage' && this.interval == false) {
                $('.link-banner').show();
                this.interval = true;
                this.getBingo();
            }

            this.api.setHeaders(true);

            this.storage.get('status').then((val) => {
                if (this.status == '') {
                    this.status = val;
                }
                this.checkStatus();
                if (!val) {
                    this.menu_items = this.menu_items_logout;
                    this.is_login = false
                } else {
                    this.is_login = true;
                    this.menu_items = this.menu_items_login;
                    this.getStatistics();
                }

                if (el.api.pageName == 'HelloIonicPage') {
                    $('.link-banner').show();
                }

                if (el.api.pageName == 'LoginPage') {
                    $('.link-banner').hide();
                }
                this.bannerStatus();

            });
            this.username = this.api.username;
        });
    }

}
