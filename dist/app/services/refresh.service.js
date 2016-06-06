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
const user_service_1 = require('../services/user.service');
const feedsource_service_1 = require('../services/feedsource.service');
const feed_service_1 = require('../services/feed.service');
const label_service_1 = require('../services/label.service');
let RefreshService = class RefreshService {
    constructor(userService, feedSourceService, feedService, labelService) {
        this.userService = userService;
        this.feedSourceService = feedSourceService;
        this.feedService = feedService;
        this.labelService = labelService;
        this.refreshSource = new Subject_1.Subject();
        this.refresh$ = this.refreshSource.asObservable();
        this.activeFeedSources = [];
    }
    startTimer() {
        this.userService.getToken();
        let timer = Rx_1.Observable.timer(1000, 1000 * 60 * 5);
        timer.subscribe(t => {
            console.log('refreshing');
            this.refresh_all();
        });
    }
    setAndRefreshFeedSources(feedSources) {
        this.activeFeedSources = feedSources;
        this.feedService.getFeeds(this.activeFeedSources);
    }
    refresh_all() {
        this.userService.getToken();
        let timer = Rx_1.Observable.timer(1000);
        timer.subscribe(t => {
            this.feedSourceService.getFeedSources();
            this.labelService.getLabels();
            this.feedService.getFeeds(this.activeFeedSources);
        });
    }
};
RefreshService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [user_service_1.UserService, feedsource_service_1.FeedSourceService, feed_service_1.FeedService, label_service_1.LabelService])
], RefreshService);
exports.RefreshService = RefreshService;
