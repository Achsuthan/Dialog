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



  constructor(public navCtrl: NavController,public http:Http,public geolocation:Geolocation,public alert:AlertController,public data:Data,public platform: Platform,private  loadingCtrl: LoadingController) {

   /* platform.ready().then(() => {
      this.loadmap();
    });*/


    var temp = this;
    setInterval(function()
    {

      temp.initMap();
      temp.getlocation;

    }, 30000);

  }
/*
  loadmap()
  {
    this.geolocation.getCurrentPosition().then((position) => {
      this.lat1=position.coords.latitude;
      this.lon1=position.coords.longitude;
      console.log("testing position",position.coords.latitude);

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);


      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: this.map.getCenter()
      });

      let content = "<h4>MyLocation</h4>";


      let infoWindow = new google.maps.InfoWindow({
        content: content
      });

      google.maps.event.addListener(marker, 'click', () => {
        infoWindow.open(this.map, marker);
      });

      this.checkDR();
    }, (err) => {
      console.log(err);
    });

  }
*/

  checkDR() {


    this.http.get('http://achsuthan.000webhostapp.com/DR/DR/getlocation.php')
        .map(res => res.json())
        .subscribe(data => {

          this.values = data;
          for (var key in this.values) {
            if (typeof data[key] === "object") {
              for (var i = 0; i < data[key].length; i++) {
                for (var property in data[key][i]) {
                 /* console.log("Testing values ", property + " = " + data[key][i][property]);*/
                  if (property == "lat") {
                    this.lat2 = data[key][i][property];
                  }
                  if (property == "lon") {
                    this.lon2 = data[key][i][property];
                  }

                  if(property=="name")
                  {
                    this.posstion=data[key][i][property];

                  }
                  if(property=="distance")
                  {
                    this.distance=data[key][i][property];
                  }
                  console.log("Original distance ",this.distance);
                }
                this.notify();
              }
            } else if (typeof data[key] === "string") {
              console.log("Testing values2", key + " = " + data[key]);
            }
          }
        });


    //get the distance between two points in
  }
  notify()
  {

    console.log("lon1",this.lon11);
    console.log("lon2",this.lon2);

    console.log("lat1",this.lat11);
    console.log("lat2",this.lat2);


    var radlat1 = Math.PI * this.lat11/180;
    var radlat2 = Math.PI * this.lat2/180;
    var theta = this.lon11-this.lon2;
    var radtheta = Math.PI * theta/180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    /*console.log("Sign Check ", Math.sin(radlat1));*/
    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344;

    console.log("Distance ",dist);


    if(dist<this.distance && this.distance!=null)
    {
      this.data.setvalue(true,this.lat11,this.lon11);
      let prompt = this.alert.create({
        title: 'You are in a critical Situation ',
        message: "Move from you place your Disaster location is "+this.posstion,

        buttons: [
          {
            text: 'Ok',
            handler: data => {
              console.log('Ok');
            }
          }
        ]
      });
      prompt.present();
    }



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
      draggable: false,
      zoomControl: true
    });
    this.createMapMarker(point);

  }

  private createMapMarker(place:any):void {
    var marker = new google.maps.Marker({
      map: this.map,
      position: place
    });
    this.markers.push(marker);
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
  }




}
