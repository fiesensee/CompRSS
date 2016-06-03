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
const core_1 = require('@angular/core');
let UserService = class UserService {
    constructor(http) {
        this.http = http;
        this.token = 'undefined';
        this.username = 'felix';
        this.password = 'sinisterkid';
        this.client_id = 'FmpYthS5vsyLtrmgJB2N2ySJpTjKnL7debXPlSow';
        this.client_secret = 'pTpeLGCIvd3Lki1NFiUgLhWFfYpasJXBi2vGVv3OUTNv6xGLSjR3Lpb00Pj4KCdiXyzedZr37otfzqiCIuhWTwmHGB0JFGNlMqLyY6BbZq4UN1q0dA9ZKKgWqsLuTcCB';
    }
    getToken() {
        let body = [
            'grant_type=password',
            'username=' + this.username,
            'password=' + this.password,
            'client_id=' + this.client_id,
            'client_secret=' + this.client_secret
        ];
        let headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post('http://localhost:8000/o/token/', body.join('&'), { headers: headers })
            .subscribe(res => this.setToken(res.json()));
    }
    setToken(token) {
        this.token = token.access_token;
    }
};
UserService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [http_1.Http])
], UserService);
exports.UserService = UserService;
