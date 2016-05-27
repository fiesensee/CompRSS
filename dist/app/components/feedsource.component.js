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
const feedsource_service_1 = require('./feedsource.service');
const common_1 = require('@angular/common');
const feed_service_1 = require('./feed.service');
const feed_component_1 = require('./feed.component');
let FeedSourceComponent = class FeedSourceComponent {
    constructor(feedService, feedSourceService) {
        this.feedService = feedService;
        this.feedSourceService = feedSourceService;
        this.expanded = false;
        this.deleted = new core_1.EventEmitter();
        this.feedService.feeds$.subscribe(feeds => this.feeds = feeds);
    }
    ngOnInit() {
        this.feedService.getFeeds(this.feedSource);
    }
    changeExpand() {
        this.expanded = !this.expanded;
        this.feedService.getFeeds(this.feedSource);
    }
    delete() {
        this.feedSourceService.deleteFeedSource(this.feedSource);
        this.deleted.emit('event');
    }
};
FeedSourceComponent = __decorate([
    core_1.Component({
        selector: 'feedsource',
        templateUrl: './app/feedsources.html',
        providers: [http_1.HTTP_PROVIDERS, feed_service_1.FeedService, feedsource_service_1.FeedSourceService],
        directives: [common_1.NgClass, feed_component_1.FeedComponent],
        inputs: ['feedSource'],
        outputs: ['deleted']
    }),
    core_1.Injectable(), 
    __metadata('design:paramtypes', [feed_service_1.FeedService, feedsource_service_1.FeedSourceService])
], FeedSourceComponent);
exports.FeedSourceComponent = FeedSourceComponent;
