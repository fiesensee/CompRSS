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
const feed_component_1 = require('./feed.component');
const label_component_1 = require('./label.component');
const feedsource_service_1 = require('../services/feedsource.service');
const feed_service_1 = require('../services/feed.service');
const user_service_1 = require('../services/user.service');
const label_service_1 = require('../services/label.service');
const refresh_service_1 = require('../services/refresh.service');
const common_1 = require('@angular/common');
const http_service_1 = require('../services/http.service');
let ReaderComponent = class ReaderComponent {
    constructor(refreshService) {
        this.refreshService = refreshService;
    }
    ngOnInit() {
        this.refreshService.startTimer();
    }
};
ReaderComponent = __decorate([
    core_1.Component({
        selector: 'app',
        templateUrl: './app/reader.html',
        providers: [feedsource_service_1.FeedSourceService, feed_service_1.FeedService, label_service_1.LabelService,
            user_service_1.UserService, refresh_service_1.RefreshService, http_service_1.HttpService, http_1.HTTP_PROVIDERS],
        directives: [feed_component_1.FeedComponent, feedsource_component_1.FeedSourceComponent, label_component_1.LabelComponent, common_1.NgClass]
    }),
    core_1.Injectable(), 
    __metadata('design:paramtypes', [refresh_service_1.RefreshService])
], ReaderComponent);
exports.ReaderComponent = ReaderComponent;
