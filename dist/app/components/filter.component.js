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
const filter_service_1 = require('../services/filter.service');
const feed_service_1 = require('../services/feed.service');
let FilterComponent = class FilterComponent {
    constructor(filterService, feedService) {
        this.filterService = filterService;
        this.feedService = feedService;
        this.filterService.filter$.subscribe(filter => {
            this.feedService.queryFeeds();
        });
    }
    setDateRange(days) {
        this.filterService.setDateRange(days);
    }
    searchTerm(term) {
        this.filterService.setTermQuery(term);
    }
};
FilterComponent = __decorate([
    core_1.Component({
        selector: 'filter',
        templateUrl: './app/filter.html'
    }),
    core_1.Injectable(), 
    __metadata('design:paramtypes', [filter_service_1.FilterService, feed_service_1.FeedService])
], FilterComponent);
exports.FilterComponent = FilterComponent;
