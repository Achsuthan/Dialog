"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
require('rxjs/add/operator/retry');
require('rxjs/add/operator/timeout');
require('rxjs/add/operator/delay');
require('rxjs/add/operator/map');
var AboutPage = (function () {
    function AboutPage(navCtrl, data, http, alert) {
        this.navCtrl = navCtrl;
        this.data = data;
        this.http = http;
        this.alert = alert;
    }
    AboutPage.prototype.send = function () {
        var _this = this;
        if (this.data.danger) {
            if (this.name != "" && this.phone != "" && (this.phone.length == 9 || this.phone.length == 10))
                this.lat = this.data.lat;
            this.lon = this.data.lon;
            this.http.get("http://localhost/Vas/DR/request.php?phone=" + this.phone + "&name=" + this.name + "&water=" + this.water + "&dryfood=" + this.dryfood + "&clothes=" + this.clothes + "&mates=" + this.mates + "&nets=" + this.nets + "&firstaid=" + this.FirstAid + "&milk=" + this.milk + "&candles=" + this.candles + "&colis=" + this.colis + "&cookedfood=" + this.CookedFood + "&lat=" + this.data.lat + "&lon=" + this.data.lon)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                var prompt = _this.alert.create({
                    title: 'Received',
                    message: "We will shortly distribute the needed items",
                    buttons: [
                        {
                            text: 'Ok',
                            handler: function (data) {
                                console.log('Ok');
                            }
                        }
                    ]
                });
            });
        }
        else {
            var prompt_1 = this.alert.create({
                title: 'Safe',
                message: "You are in a safe area",
                buttons: [
                    {
                        text: 'Ok',
                        handler: function (data) {
                            console.log('Ok');
                        }
                    }
                ]
            });
        }
    };
    AboutPage.prototype.clear = function () {
        this.phone = "";
        this.name = "";
        this.water = false;
        this.dryfood = false;
        this.clothes = false;
        this.mates = false;
        this.nets = false;
        this.FirstAid = false;
        this.milk = false;
        this.candles = false;
        this.colis = false;
        this.CookedFood = false;
    };
    AboutPage = __decorate([
        core_1.Component({
            selector: 'page-about',
            templateUrl: 'about.html'
        })
    ], AboutPage);
    return AboutPage;
}());
exports.AboutPage = AboutPage;
