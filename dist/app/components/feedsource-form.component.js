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
const feedsource_1 = require('./feedsource');
const feedsource_service_1 = require('./feedsource.service');
let FeedSourceFormComponent = class FeedSourceFormComponent {
    constructor(feedSourceService) {
        this.feedSourceService = feedSourceService;
        this.active = false;
        this.created = new core_1.EventEmitter();
        this.feedsource = new feedsource_1.FeedSource('', '');
    }
    switchActive() {
        this.active = !this.active;
    }
    onSubmit() {
        this.feedSourceService.saveFeedSource(this.feedsource);
        this.created.emit('event');
        this.feedsource = new feedsource_1.FeedSource('', '');
        this.switchActive();
    }
};
FeedSourceFormComponent = __decorate([
    core_1.Component({
        selector: 'feedsource-form',
        templateUrl: './app/feedsource-form.html',
        providers: [feedsource_service_1.FeedSourceService],
        outputs: ['created']
    }),
    core_1.Injectable(), 
    __metadata('design:paramtypes', [feedsource_service_1.FeedSourceService])
], FeedSourceFormComponent);
exports.FeedSourceFormComponent = FeedSourceFormComponent;
