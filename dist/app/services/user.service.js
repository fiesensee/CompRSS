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
const user_1 = require('../models/user');
let UserService = class UserService {
    constructor(http) {
        this.http = http;
        this.token = 'undefined';
        this.tokenSource = new Subject_1.Subject();
        this.token$ = this.tokenSource.asObservable();
        this.user = null;
        this.restUrl = 'https://comprest.herokuapp.com/';
        this.superUser = new user_1.User();
        this.client_id = 'nNRd7e60nzUNlzlpM0wgw3Bvq0ck9TkNN43was44';
        this.client_secret = 'qqIIPLKgdzez8nCYUXkM9847GijrQmFzHQMinJ80KINMukHwQhhG8QzhPWmttTAwuEZ58V0qpWSoSVaOXMQyPsM74Xk4MlruqyAtGbmsQtmsMmNFatlJHuWiRuqZdjNI';
        this.superUser.username = 'felix';
        this.superUser.password = 'sinisterkid10';
    }
    getToken() {
        console.log('getting token');
        this.authenticate(this.user).subscribe(res => this.setToken(res.json().access_token));
    }
    getSuperUserToken() {
        let request = this.authenticate(this.superUser);
        return request;
    }
    setToken(token) {
        this.tokenSource.next(token);
        this.token = token;
    }
    authenticate(user) {
        let body = [
            'grant_type=password',
            'username=' + user.username,
            'password=' + user.password,
            'client_id=' + this.client_id,
            'client_secret=' + this.client_secret
        ];
        let headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let request = this.http.post(this.restUrl + 'o/token/', body.join('&'), { headers: headers });
        return request;
    }
    loginUser(user) {
        console.log('loggin in');
        this.user = user;
        return this.authenticate(user);
    }
    getUser() {
        return this.user;
    }
    isAuthenticated(user) {
        let emptyUser = new user_1.User();
        if (this.user === emptyUser) {
            return false;
        }
    }
    logoutUser() {
        this.user = null;
    }
    registerUser(user, token) {
        let request;
        let headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + token);
        request = this.http.post(this.restUrl + 'users/', JSON.stringify(user), { headers: headers });
        return request;
    }
};
UserService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [http_1.Http])
], UserService);
exports.UserService = UserService;
