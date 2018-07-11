import {Component} from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';
import {ApiQuery} from "../../library/api-query";


@Component({
    selector: 'page-item-details',
    templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
    selectedItem: any;

    constructor(public navCtrl: NavController, public navParams: NavParams,public api: ApiQuery) {
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
    }

    ionViewWillEnter() {
        this.api.pageName = 'InboxPage';
    }
}
