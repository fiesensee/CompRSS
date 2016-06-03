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
const feedsource_1 = require('../models/feedsource');
const feedsource_service_1 = require('../services/feedsource.service');
const common_1 = require('@angular/common');
const feed_component_1 = require('./feed.component');
let FeedSourceComponent = class FeedSourceComponent {
    constructor(feedSourceService) {
        this.feedSourceService = feedSourceService;
        this.newFeedSource = new feedsource_1.FeedSource('', '', '', false);
        this.changed = new core_1.EventEmitter();
        this.emitSources = new core_1.EventEmitter();
    }
    deleteFeedSource(feedSource) {
        this.feedSourceService.deleteFeedSource(feedSource);
        this.changed.emit('event');
    }
    saveFeedSource() {
        this.feedSourceService.saveFeedSource(this.newFeedSource);
        this.newFeedSource = new feedsource_1.FeedSource('', '', '', false);
        this.changed.emit('event');
    }
    changeActive(feedSource) {
        let index = this.feedSources.indexOf(feedSource);
        let targetSource = this.feedSources[index];
        targetSource.active = !targetSource.active;
        this.feedSources[index] = targetSource;
        this.emitSources.emit({ value: this.feedSources });
    }
};
FeedSourceComponent = __decorate([
    core_1.Component({
        selector: 'feedsources',
        templateUrl: './app/feedsources.html',
        directives: [common_1.NgClass, feed_component_1.FeedComponent],
        inputs: ['feedSources'],
        outputs: ['changed', 'emitSources']
    }),
    core_1.Injectable(), 
    __metadata('design:paramtypes', [feedsource_service_1.FeedSourceService])
], FeedSourceComponent);
exports.FeedSourceComponent = FeedSourceComponent;
