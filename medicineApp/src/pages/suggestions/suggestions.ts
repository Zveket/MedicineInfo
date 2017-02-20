/**
 * @ngdoc Component
 * @name MainMenu
 * 
 * @description
 * 
 * The Main Menu page
 */

import { Component,Inject } from '@angular/core';
import { Barcodescanner } from '../barcodescanner/barcodescanner';
import { ModalController, ViewController, NavController, NavParams } from 'ionic-angular';
import { MedicineInfo } from '../medicineinfo/medicineinfo';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ModalContentPage } from '../searchModal/modalcontentpage';
import { BarcodeScanner } from 'ionic-native';
import { MyProfile } from '../myprofile/myprofile';
import { EditProfile } from '../editprofile/editprofile';
import { Logout } from '../logout/logout';
import { Auth, User } from '@ionic/cloud-angular';
import { Login } from '../login/login';
import { Signup } from '../signup/signup';
import { PagesService } from '../../app/pages.service';
import { AlertController } from 'ionic-angular';
import { Searchbar } from '../searchbar/searchbar';

@Component({
  templateUrl: 'suggestions.html'
})

export class Suggestions {
  suggestions: string[];
  intro_sugg: string;

  constructor(
    private pagesService: PagesService,
    public modalCtrl: ModalController, public navCtrl: NavController,
     private param: NavParams, private http: Http, public viewCtrl: ViewController,
      public user: User, public auth: Auth, public alertCtrl: AlertController
  ) {
    this.setSuggestions(param.get('data'));
  }


  ngAfterViewInit() {
    if(this.auth.isAuthenticated()) {
      this.pagesService.logged();
    } else {
      this.pagesService.nonLogged();
    }
  }
  /**
   * @ngdoc method
   * @name getSuggestions
   * @returns this.suggestions list of medicine names that matches search
   */
  getSuggestions() {
    return this.suggestions;
  }

  /**
   * @ngdoc method
   * @name setSuggestions
   * @param {any[]} suggestions list of medicine names that matches search
   * 
   * @description
   * 
   * This method gets 10 suggestions that matched search criteria and 
   * stores them in array which is displayed in Main Menu
   */
  setSuggestions(suggestions: any[]) {
    let new_suggestions_formatted: any[];
    if(suggestions[0]) {
      this.intro_sugg = "Where you looking for...";
      new_suggestions_formatted = [];
      let i = 0;
      for(let entry of suggestions) {
        if(entry.title && entry.description && entry.side_effects && entry.how_does_it && entry.benefits && i < 10) {
          //format the description of Medicine
          entry.description_short = entry.description.substr(0, 40) + "...";
          entry.description_short = entry.description_short.replace('<p>', '');
          entry.description_short = entry.description_short.replace('</p>', '');
          entry.description_short = entry.description_short.replace('is', '-');
          new_suggestions_formatted.push(entry);
        }
        //restrict number of suggestions to 10
        i++;
      }
      this.suggestions = new_suggestions_formatted;
    }
  }

  /**
   * @ngdoc method
   * @name goToItem
   * @param {object} item medicine which has title, description, benefits, and other general information
   * 
   * @description
   * 
   * This method takes medicine as argument and goes to MedicineInfo object
   * with medicine being displayed.
   * Error message is displayed if incorrect data is provided
   */
  goToItem(item: any) {
    if(item.title && item.description && item.side_effects && item.how_does_it && item.benefits) {
      this.navCtrl.push(MedicineInfo, {
        "title":  item.title,
        "description": item.description,
        "side_effects": item.side_effects,
        "how_does_it": item.how_does_it,
        "benefits": item.benefits,
        "elderly": item.elderly,
        "stores": item.stores
      }).then(() => {
        //const index = this.viewCtrl.index;
        //this.navCtrl.remove(index);
      });
    }
  }
}


