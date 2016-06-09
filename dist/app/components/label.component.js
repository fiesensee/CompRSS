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
        this.feedSources = [];
        this.labels = [];
        this.newLabel = new label_1.Label('', [], '', 0, false);
        this.labelService.labels$.subscribe(labels => {
            this.setLabels(labels);
            this.refreshFeedSources();
        });
        this.feedSourceService.feedSources$.subscribe(sources => {
            this.feedSources = sources;
        });
    }
    setFeedSources(sources) {
        let activeSources = this.getActiveSources();
        activeSources.forEach(source => source.active = false);
        sources.forEach(source => {
            activeSources.forEach(activeSource => {
                if (source === activeSource) {
                    source.active = true;
                }
            });
        });
        this.feedSources = sources;
    }
    setLabels(labels) {
        let activeLabels = this.labels.filter(label => label.active);
        if (activeLabels.length === 0) {
            this.labels = labels;
        }
        ;
        labels.forEach(label => {
            activeLabels.forEach(activeLabel => {
                if (label.url === activeLabel.url) {
                    label.active = true;
                }
            });
        });
        this.labels = labels;
    }
    refreshFeedSources() {
        let activeSources = this.getActiveSources();
        this.feedSources.forEach(source => {
            source.active = false;
            activeSources.forEach(activeSource => {
                if (source.url === activeSource.url) {
                    source.active = true;
                }
            });
        });
    }
    deleteLabel(label) {
        this.labelService.deleteLabel(label);
    }
    saveNewLabel() {
        this.newLabel.feedSources = this.getActiveSources();
        this.labelService.saveLabel(this.newLabel);
        this.newLabel = new label_1.Label('', [], '', 0, false);
    }
    setActiveSources(args) {
        let feedSource = args.value;
        let activeLabels = this.labels.filter(label => label.active);
        activeLabels.forEach(label => {
            let index = label.feedSources.findIndex(source => source.url === feedSource.url);
            if (feedSource.active) {
                if (index === -1) {
                    label.feedSources.push(feedSource);
                }
            }
            else {
                if (index > -1) {
                    label.feedSources.splice(index, 1);
                }
            }
            this.labelService.updateLabel(label);
        });
        this.refreshFeedSources();
        this.refreshFeeds();
    }
    refreshFeeds() {
        this.refreshService.setAndRefreshFeedSources(this.getActiveSources());
    }
    getActiveSources() {
        let activeLabels = this.labels.filter(label => label.active);
        if (activeLabels.length === 0) {
            return [];
        }
        let activeSources = [];
        activeLabels.forEach(activeLabel => {
            activeLabel.feedSources.forEach(activeSource => {
                if (activeSources.findIndex(source => source === activeSource) === -1) {
                    activeSources.push(activeSource);
                }
            });
        });
        return activeSources;
    }
    changeActive(targetLabel) {
        targetLabel.active = !targetLabel.active;
        this.refreshFeedSources();
        this.refreshFeeds();
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
