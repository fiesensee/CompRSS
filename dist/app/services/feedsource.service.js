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
const core_1 = require('@angular/core');
const Subject_1 = require('rxjs/Subject');
const Rx_1 = require('rxjs/Rx');
const http_1 = require('@angular/http');
const user_service_1 = require('./user.service');
let FeedSourceService = class FeedSourceService {
    constructor(http, userService) {
        this.http = http;
        this.userService = userService;
        this.feedSourcesSource = new Subject_1.Subject();
        this.feedSources$ = this.feedSourcesSource.asObservable();
        this.userService.token$.subscribe(token => this.token = token);
        this.userService.getToken();
    }
    startTimer() {
        let timer = Rx_1.Observable.timer(1000, 1000 * 60 * 5);
        timer.subscribe(t => this.refresh());
    }
    refresh() {
        this.userService.getToken();
        this.getFeedSources();
    }
    saveFeedSource(feedSource) {
        let headers = new http_1.Headers();
        headers.append('Authorization', 'Bearer ' + this.token.toString());
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let body = [
            'name=' + feedSource.name,
            'sourceUrl=' + feedSource.sourceUrl
        ];
        this.http.post('http://localhost:8000/feedsources/', body.join('&'), { headers: headers })
            .subscribe(res => { this.getFeedSources(); console.log('saved'); });
    }
    getFeedSources() {
        console.log('test');
        let headers = new http_1.Headers();
        headers.append('Authorization', 'Bearer ' + this.token.toString());
        this.http.get('http://localhost:8000/feedsources/', { headers: headers })
            .subscribe(sources => { this.feedSourcesSource.next(sources.json().results); console.log(sources.json().results); });
    }
    deleteFeedSource(targetSource) {
        let headers = new http_1.Headers();
        headers.append('Authorization', 'Bearer ' + this.token.toString());
        this.http.delete(targetSource.url, { headers: headers })
            .subscribe(res => this.getFeedSources());
    }
};
FeedSourceService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [http_1.Http, user_service_1.UserService])
], FeedSourceService);
exports.FeedSourceService = FeedSourceService;
