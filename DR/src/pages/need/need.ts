import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Data } from '../../providers/data';
import { Http } from '@angular/http';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-need',
  templateUrl: 'need.html'
})
export class NeedPage {

  public water:any;
  public dryfood:any;
  public clothes:any;
  public mates:any;
  public nets:any;
  public FirstAid:any;
  public milk:any;
  public candles:any;
  public colis:any;
  public CookedFood:any;
  public phone:any;
  public name:any;
  public lat:any;
  public lon:any;

  constructor(public navCtrl: NavController,public data:Data,public http:Http,public alert:AlertController)
  {
  }


  send()
  {
    if (this.data.danger)
    {
      var mobile=""+this.phone;
      console.log("test",mobile);
      if (this.name!=null && this.phone!=null && mobile.length>=9 && mobile.length<=10) {

        if(this.water || this.dryfood || this.clothes || this.mates || this.nets || this.FirstAid || this.milk || this.candles || this.colis || this.CookedFood)
        {
          this.lat = this.data.lat;
          this.lon = this.data.lon;

          this.http.get("http://achsuthan.000webhostapp.com/DR/DR/request.php?phone=" + this.phone + "&name=" + this.name + "&water=" + this.water + "&dryfood=" + this.dryfood + "&clothes=" + this.clothes + "&mates=" + this.mates + "&nets=" + this.nets + "&firstaid=" + this.FirstAid + "&milk=" + this.milk + "&candles=" + this.candles + "&colis=" + this.colis + "&cookedfood=" + this.CookedFood + "&lat=" + this.data.lat + "&lon=" + this.data.lon)
              .map(res => res.json())
              .subscribe(data => {

                let prompt = this.alert.create({
                  title: 'Received',
                  message: "We will shortly distribute the needed items",

                  buttons: [
                    {
                      text: 'Ok',
                      handler: data => {
                        console.log('Ok');
                        this.phone="";
                        this.name="";
                        this.water=false;
                        this.dryfood=false;
                        this.clothes=false;
                        this.mates=false;
                        this.nets=false;
                        this.FirstAid=false;
                        this.milk=false;
                        this.candles=false;
                        this.colis=false;
                        this.CookedFood=false;
                      }
                    }
                  ]
                });
                prompt.present();

              });
        }
        else
        {
          let prompt = this.alert.create({
            title: 'Error',
            message: "Select atleast one needed item",

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
      else
      {
        let prompt = this.alert.create({
          title: 'Error',
          message: "Check the Phone number and Name",

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
    else
    {
      let prompt = this.alert.create({
        title: 'Safe',
        message: "You are in a safe area",

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
  clear()
  {
    this.phone="";
    this.name="";
    this.water=false;
    this.dryfood=false;
    this.clothes=false;
    this.mates=false;
    this.nets=false;
    this.FirstAid=false;
    this.milk=false;
    this.candles=false;
    this.colis=false;
    this.CookedFood=false;
  }

}
