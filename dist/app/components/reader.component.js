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
const http_1 = require('@angular/http');
const feedsource_1 = require('../models/feedsource');
const feed_component_1 = require('./feed.component');
const feedsource_service_1 = require('../services/feedsource.service');
const feed_service_1 = require('../services/feed.service');
const user_service_1 = require('../services/user.service');
const common_1 = require('@angular/common');
let ReaderComponent = class ReaderComponent {
    constructor(feedSourceService, feedService, userService) {
        this.feedSourceService = feedSourceService;
        this.feedService = feedService;
        this.userService = userService;
        this.feeds = [];
        this.feedSource = new feedsource_1.FeedSource('', '', '');
        this.feedSourceService.feedSources$.subscribe(sources => { this.feedSources = sources; console.log(sources); });
        this.feedService.feeds$.subscribe(feeds => this.feeds = feeds);
    }
    getFeeds(feedSources) {
    }
    deleteFeedSource(feedSource) {
        this.feedSourceService.deleteFeedSource(feedSource);
    }
    saveFeedSource() {
        this.feedSourceService.saveFeedSource(this.feedSource);
        this.feedSource = new feedsource_1.FeedSource('', '', '');
    }
    ngOnInit() {
        this.feedSourceService.startTimer();
    }
};
ReaderComponent = __decorate([
    core_1.Component({
        selector: 'app',
        templateUrl: './app/reader.html',
        providers: [feedsource_service_1.FeedSourceService, feed_service_1.FeedService, user_service_1.UserService, http_1.HTTP_PROVIDERS],
        directives: [feed_component_1.FeedComponent, common_1.NgClass]
    }),
    core_1.Injectable(), 
    __metadata('design:paramtypes', [feedsource_service_1.FeedSourceService, feed_service_1.FeedService, user_service_1.UserService])
], ReaderComponent);
exports.ReaderComponent = ReaderComponent;
