import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Data provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Data {

  public danger:false;
  public lat:any;
  public lon:any;

  constructor(public http: Http) {
    console.log('Hello Data Provider');
  }

  setvalue(danger,lat,lon)
  {
    this.danger=danger;
    this.lat=lat;
    this.lon=lon;
  }

}
