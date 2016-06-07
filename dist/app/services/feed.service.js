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
const feed_1 = require('../models/feed');
const jQuery = require('jquery');
const Subject_1 = require('rxjs/Subject');
const http_service_1 = require('./http.service');
let FeedService = class FeedService {
    constructor(http) {
        this.http = http;
        this.feedsSource = new Subject_1.Subject();
        this.feeds$ = this.feedsSource.asObservable();
        this.feeds = [];
    }
    getFeeds(feedSources) {
        this.feeds = [];
        if (feedSources.length == 0) {
            this.feedsSource.next([]);
        }
        else {
            for (let feedSource of feedSources) {
                this.http.get('proxy/' + feedSource.sourceUrl).subscribe(res => this.parseRSS(res.text()));
            }
        }
    }
    parseRSS(xml) {
        let feeds = [];
        let xmlDoc = jQuery.parseXML(xml);
        let $xml = $(xmlDoc);
        let $entries = $xml.find('item').each(function () {
            let feed = new feed_1.Feed();
            feed.title = $(this).find('title').text();
            feed.text = $(this).find('description').text();
            feed.url = $(this).find('link').text();
            feed.date = new Date($(this).find('pubDate').text());
            feeds.push(feed);
        });
        this.feeds = this.feeds.concat(feeds);
        this.feeds.sort((feeda, feedb) => feedb.date.valueOf() - feeda.date.valueOf());
        this.feedsSource.next(this.feeds);
    }
};
FeedService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [http_service_1.HttpService])
], FeedService);
exports.FeedService = FeedService;
