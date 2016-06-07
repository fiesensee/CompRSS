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
const http_1 = require('@angular/http');
const user_service_1 = require('./user.service');
const http_service_1 = require('./http.service');
let FeedSourceService = class FeedSourceService {
    constructor(http, userService) {
        this.http = http;
        this.userService = userService;
        this.feedSourcesSource = new Subject_1.Subject();
        this.feedSources$ = this.feedSourcesSource.asObservable();
    }
    saveFeedSource(feedSource) {
        let body = {
            "name": feedSource.name,
            "sourceUrl": feedSource.sourceUrl
        };
        this.http.post('feedsources/', JSON.stringify(body))
            .subscribe(res => { this.getFeedSources(); console.log('saved'); });
    }
    getFeedSources() {
        let headers = new http_1.Headers();
        let token = this.userService.token;
        headers.append('Authorization', 'Bearer ' + token.toString());
        this.http.get('feedsources/')
            .subscribe(sources => this.feedSourcesSource.next(sources.json()));
    }
    deleteFeedSource(targetSource) {
        this.http.delete(targetSource.url)
            .subscribe(res => this.getFeedSources());
    }
};
FeedSourceService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [http_service_1.HttpService, user_service_1.UserService])
], FeedSourceService);
exports.FeedSourceService = FeedSourceService;
