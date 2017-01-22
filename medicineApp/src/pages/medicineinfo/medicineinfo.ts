import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import {
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapsLatLng,
 CameraPosition,
 GoogleMapsMarkerOptions,
 GoogleMapsMarker
} from 'ionic-native';



@Component({
  selector: 'page-medicineinfo',
  templateUrl: 'medicineinfo.html'
})
export class MedicineInfo {
  title: any;
  description: any;
  side_effects: any;

  constructor(private navCtrl: NavController, navParams: NavParams) {
    this.title = navParams.get("title");
    this.description = navParams.get("description");
    this.side_effects = navParams.get("side_effects");
  }

  // Load map only after view is initialize
  ngAfterViewInit() {
   //this.loadMap();
  }

  loadMap() {
   // make sure to create following structure in your view.html file
   // <ion-content>
   //  <div #map id="map"></div>
   // </ion-content>

   // create a new map by passing HTMLElement
   let element: HTMLElement = document.getElementById('map');

   let map = new GoogleMap(element);

   // listen to MAP_READY event
   map.one(GoogleMapsEvent.MAP_READY).then(() => console.log("map ready!"));

   // create LatLng object
   let ionic: GoogleMapsLatLng = new GoogleMapsLatLng(43.0741904,-89.3809802);

   // create CameraPosition
   let position: CameraPosition = {
     target: ionic,
     zoom: 18,
     tilt: 30
   };

   // move the map's camera to position
   map.moveCamera(position);



   // create new marker
   let markerOptions: GoogleMapsMarkerOptions = {
     position: ionic,
     title: 'Ionic'
   };



   map.addMarker(markerOptions)
     .then((marker: GoogleMapsMarker) => {
        marker.showInfoWindow();

      });

  }

}
