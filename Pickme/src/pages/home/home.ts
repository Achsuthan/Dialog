import { Component,ViewChild,ElementRef,OnInit  } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';


import { Geolocation } from '@ionic-native/geolocation';
import { AlertController } from 'ionic-angular';
import { Data } from '../../providers/data';

import { Http } from '@angular/http';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';

declare var google:any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage  implements OnInit {

  @ViewChild("map") mapElement:ElementRef;
  map:any;
  markers = [];

  public values:any=[];
  public lat1:number=0;
  public lon1:number=0;
  public lat2:any;
  public lon2:any;
  public lat11:any;
  public lon11:any;
  public posstion:any;
  public distance:any;



  constructor(public navCtrl: NavController,public http:Http,public geolocation:Geolocation,public alertCtrl: AlertController,public data:Data,public platform: Platform,private  loadingCtrl: LoadingController) {

   /* platform.ready().then(() => {
      this.loadmap();
    });*/


    /*var temp = this;
    setInterval(function()
    {

      temp.initMap();
      temp.getlocation;

    }, 30000);*/

  }




  ngOnInit() {

    this.initMap();
    this.getlocation();
  }

  private getlocation()
  {

    this.loadingCtrl.create({
      content: 'Please wait...',
      duration: 4000,
      dismissOnPageChange: true
    }).present();


    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      this.lat1 = position.coords.latitude;
      this.lon1 = position.coords.longitude;
      this.lat11 = position.coords.latitude;
      this.lon11 = position.coords.longitude;
/*
      console.log("test1", this.lat1);
      console.log("test2", this.lon1);*/
    });

  }

  private initMap() {


    let element = document.getElementById('map');


    var point = {lat: this.lat1, lng: this.lon1};

   /* console.log("test3", this.lat1);
    console.log("test4", this.lon1);*/
    let divMap = (<HTMLInputElement>document.getElementById('map'));
    this.map = new google.maps.Map(divMap, {
      center: point,
      zoom: 15,
      disableDefaultUI: true,
      draggable: true,
      zoomControl: true
    });
    this.createMapMarker(point,1,"me");

  }



  private createMapMarker(place:any,number:any,object:any):void {


    var myIcon;
    if(object=="me")
    {
      myIcon = new google.maps.MarkerImage("https://cdn0.iconfinder.com/data/icons/user-icons-4/100/user-17-512.png", null, null, null, new google.maps.Size(100, 100));
    }
    else
    {
      myIcon = new google.maps.MarkerImage("http://emosite.volkswagen.de/esn/up-eco-cheer/assets/img/streetUp/Street-Up_white_pearl.png", null, null, null, new google.maps.Size(100, 50));
    }
    var marker = new google.maps.Marker({
      map: this.map,
      position: place,
      icon:myIcon,

    });
    this.markers.push(marker);

    marker.addListener('click', (event) => {
      this.call(number,object);

    });
  }

  public call(number:any,object:any)
  {
    if(object=="vehicle") {
      var title = "";
      if (number == "1") {
        title = "Driver Name : Achsuthan \n Vehicle Name : ABC123 Contact Number : +94774455878";
      }
      else if (number == "2") {
        title = "Driver Name : Thebeyantha \n Vehicle Name : QWRT12 Contact Number : +94777123456";
      }
      else if (number == "3") {
        title = "Driver Name : Ashok \n Vehicle Name : ERTYT12 Contact Number : +94777678678";
      }
      let confirm = this.alertCtrl.create({
        title: '' + title,
        message: 'Do you want to book this vehicle ?',
        buttons: [
          {
            text: 'Disagree',
            handler: () => {
              console.log('Disagree clicked');
            }
          },
          {
            text: 'Agree',
            handler: () => {
              console.log('Agree clicked');
            }
          }
        ]
      });
      confirm.present();
    }
  }



  doRefresh(refresher)
  {

    console.log('Begin async operation', refresher);
    this.initMap();


    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 4000);

    this.getlocation();
    var point = {lat: 6.918567, lng: 79.861164};
    this.createMapMarker(point,2,"vehicle");

    var point = {lat: 6.917395, lng: 79.861239};
    this.createMapMarker(point,3,"vehicle");

  }




}
