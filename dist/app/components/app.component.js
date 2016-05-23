"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
const http_1 = require('angular2/http');
const core_1 = require('angular2/core');
let FeedSource = class FeedSource {
    constructor(http) {
        this.http = http;
        this.test();
    }
    setFeedSource(name, url) {
        this.name = name;
        this.url = url;
    }
    getFeed() {
        this.http.get(this.url).subscribe(res => this.feed = res.text());
    }
    test() {
        this.setFeedSource('test', 'http://heise.de/newsticker/heise-atoms.xml');
        this.getFeed();
    }
};
FeedSource = __decorate([
    core_1.Component({
        selector: 'app',
        templateUrl: './app/app.html',
        providers: [http_1.Http, http_1.HTTP_PROVIDERS]
    }),
    core_1.Injectable(),
    __param(0, core_1.Inject(http_1.Http))
], FeedSource);
exports.FeedSource = FeedSource;
