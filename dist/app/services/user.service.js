"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const http_1 = require('@angular/http');
const Subject_1 = require('rxjs/Subject');
const core_1 = require('@angular/core');
let UserService = class UserService {
    constructor(http) {
        this.http = http;
        this.token = 'undefined';
        this.tokenSource = new Subject_1.Subject();
        this.token$ = this.tokenSource.asObservable();
        this.username = 'felix';
        this.password = 'sinisterkid10';
        this.client_id = 'nNRd7e60nzUNlzlpM0wgw3Bvq0ck9TkNN43was44';
        this.client_secret = 'qqIIPLKgdzez8nCYUXkM9847GijrQmFzHQMinJ80KINMukHwQhhG8QzhPWmttTAwuEZ58V0qpWSoSVaOXMQyPsM74Xk4MlruqyAtGbmsQtmsMmNFatlJHuWiRuqZdjNI';
    }
    getToken() {
        let request = this.authenticate().subscribe(res => this.setToken(res.json()));
    }
    authenticate() {
        let body = [
            'grant_type=password',
            'username=' + this.user.username,
            'password=' + this.user.password,
            'client_id=' + this.client_id,
            'client_secret=' + this.client_secret
        ];
        let headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let request = this.http.post('https://comprest.herokuapp.com/o/token/', body.join('&'), { headers: headers });
        return request;
    }
    setToken(token) {
        this.tokenSource.next(token.access_token);
        this.token = token.access_token;
    }
    loginUser(user) {
        this.user = user;
        return this.authenticate();
    }
};
UserService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [http_1.Http])
], UserService);
exports.UserService = UserService;
