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
const feedsource_component_1 = require('./feedsource.component');
const feedsource_form_component_1 = require('./feedsource-form.component');
const feedsource_service_1 = require('../services/feedsource.service');
let App = class App {
    constructor(feedSourceService) {
        this.feedSourceService = feedSourceService;
        this.feedSourceService.feedSources$.subscribe(sources => this.feedSources = sources);
    }
    ngOnInit() {
        this.feedSourceService.getFeedSources();
    }
    refresh() {
        this.feedSourceService.getFeedSources();
    }
};
App = __decorate([
    core_1.Component({
        selector: 'app',
        templateUrl: './app/app.html',
        providers: [feedsource_service_1.FeedSourceService, http_1.HTTP_PROVIDERS],
        directives: [feedsource_form_component_1.FeedSourceFormComponent, feedsource_component_1.FeedSourceComponent]
    }),
    core_1.Injectable(), 
    __metadata('design:paramtypes', [feedsource_service_1.FeedSourceService])
], App);
exports.App = App;
