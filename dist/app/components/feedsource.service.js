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
const core_1 = require('angular2/core');
const ConfigStore = require('configstore');
const Subject_1 = require('rxjs/Subject');
let FeedSourceService = class FeedSourceService {
    constructor(config) {
        this.config = config;
        this.feedSourcesSource = new Subject_1.Subject();
        this.feedSources$ = this.feedSourcesSource.asObservable();
        this.config = new ConfigStore('FeedSources');
    }
    saveFeedSource(feedSource) {
        let feedSources = this.config.get('sources');
        feedSources.push(feedSource);
        this.config.set('sources', feedSources);
    }
    getFeedSources() {
        let feedSources = this.config.get('sources');
        this.feedSourcesSource.next(feedSources);
    }
    deleteFeedSource(feedSource) {
        let feedSources = this.config.get('sources');
        let index = feedSources.findIndex(source => source.name == feedSource.name);
        feedSources.splice(index, 1);
        this.config.set('sources', feedSources);
    }
};
FeedSourceService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [ConfigStore])
], FeedSourceService);
exports.FeedSourceService = FeedSourceService;
