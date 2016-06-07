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
const user_service_1 = require('./user.service');
const core_1 = require('@angular/core');
let HttpService = class HttpService {
    constructor(http, userService) {
        this.http = http;
        this.userService = userService;
        this.headers = new http_1.Headers();
        this.rootUrl = 'https://comprest.herokuapp.com/';
        this.userService.token$.subscribe(token => this.setTokenHeaders(token));
        this.headers.set('Content-Type', 'application/json');
    }
    setTokenHeaders(token) {
        this.headers.set('Authorization', 'Bearer ' + token.toString());
    }
    post(url, body) {
        console.log('saving: ' + body);
        let request = this.http.post(this.rootUrl + url, body, { headers: this.headers });
        return request;
    }
    get(url) {
        return this.http.get(this.rootUrl + url, { headers: this.headers });
    }
    delete(url) {
        return this.http.delete(url, { headers: this.headers });
    }
};
HttpService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [http_1.Http, user_service_1.UserService])
], HttpService);
exports.HttpService = HttpService;
