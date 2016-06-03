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
const common_1 = require('@angular/common');
const label_service_1 = require('../services/label.service');
const feedsource_service_1 = require('../services/feedsource.service');
const label_1 = require('../models/label');
const feedsource_component_1 = require('./feedsource.component');
const refresh_service_1 = require('../services/refresh.service');
let LabelComponent = class LabelComponent {
    constructor(labelService, refreshService, feedSourceService) {
        this.labelService = labelService;
        this.refreshService = refreshService;
        this.feedSourceService = feedSourceService;
        this.defaultLabel = new label_1.Label('Default', [], '', true);
        this.activeLabel = this.defaultLabel;
        this.newLabel = new label_1.Label('', [], '', false);
        this.labelService.labels$.subscribe(labels => this.labels = labels);
        this.feedSourceService.feedSources$.subscribe(sources => {
            this.defaultLabel.feedSources = sources;
            this.refreshActiveLabel();
        });
    }
    refreshActiveLabel() {
        let tmpLabel = this.defaultLabel;
        for (let source of this.activeLabel.feedSources) {
            if (source.active) {
                let index = tmpLabel.feedSources.indexOf(source);
                tmpLabel.feedSources[index].active = true;
            }
        }
        this.activeLabel = tmpLabel;
        this.refreshFeeds();
    }
    deleteLabel(label) {
        this.labelService.deleteLabel(label);
        this.activeLabel = this.defaultLabel;
    }
    saveNewLabel() {
        this.newLabel.feedSources = this.activeLabel.feedSources;
        this.labelService.saveLabel(this.newLabel);
        this.newLabel = new label_1.Label('', [], '', false);
    }
    updateActiveLabel() {
        this.labelService.updateLabel(this.activeLabel);
    }
    setActiveSources(args) {
        this.activeLabel.feedSources = args.value;
        this.refreshFeeds();
        this.updateActiveLabel();
    }
    refreshFeeds() {
        this.activeSources = [];
        for (let source of this.activeLabel.feedSources) {
            if (source.active) {
                this.activeSources.push(source);
            }
        }
        this.refreshService.setAndRefreshFeedSources(this.activeSources);
    }
};
LabelComponent = __decorate([
    core_1.Component({
        selector: 'labels',
        templateUrl: './app/labels.html',
        directives: [common_1.NgClass, feedsource_component_1.FeedSourceComponent],
        inputs: ['labels'],
        outputs: ['changed']
    }),
    core_1.Injectable(), 
    __metadata('design:paramtypes', [label_service_1.LabelService, refresh_service_1.RefreshService, feedsource_service_1.FeedSourceService])
], LabelComponent);
exports.LabelComponent = LabelComponent;
