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
const http_service_1 = require('./http.service');
const filter_service_1 = require('./filter.service');
let FeedService = class FeedService {
    constructor(http, filterService) {
        this.http = http;
        this.filterService = filterService;
        this.feedsSource = new Subject_1.Subject();
        this.feeds$ = this.feedsSource.asObservable();
        this.feeds = [];
        this.feedSources = [];
        this.filter = this.filterService.getFilterString();
    }
    setFeedSources(feedSources) {
        this.feedSources = feedSources;
    }
    getFeeds() {
        let feedSources = this.feedSources;
        this.feeds = [];
        if (feedSources.length == 0) {
            this.feedsSource.next([]);
        }
        else {
            let body = [];
            for (let feedSource of feedSources) {
                body.push(feedSource.sourceUrl);
            }
            this.http.post('getfeeds/', JSON.stringify(body))
                .subscribe(res => this.queryFeeds());
        }
    }
    queryFeeds() {
        this.filter = this.filterService.getFilterString();
        this.http.queryES('feeds/feed/_search?size=300', this.filter)
            .subscribe(res => this.setFeeds(res.json().hits.hits));
    }
    setFeeds(queryHits) {
        let feeds = [];
        for (let hit of queryHits) {
            hit._source.date = new Date(hit._source.date);
            feeds.push(hit._source);
        }
        this.feedsSource.next(feeds);
    }
};
FeedService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [http_service_1.HttpService, filter_service_1.FilterService])
], FeedService);
exports.FeedService = FeedService;
