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
const Subject_1 = require('rxjs/Subject');
let FilterService = class FilterService {
    constructor() {
        this.filterSource = new Subject_1.Subject();
        this.filter$ = this.filterSource.asObservable();
        this.filter = {
            sort: [{ date: { order: "desc" } }],
            query: { bool: {
                    filter: [
                        { range: { date: { gte: "now-1d/d" } } }
                    ]
                } }
        };
    }
    setDateRange(days) {
        this.filter.query.bool.filter[0].range.date.gte = "now-" + days.toString() + "d/d";
        this.setFilter(this.filter);
    }
    setTermQuery(term) {
        if (term === '') {
            delete this.filter.query.bool.filter[1];
        }
        else {
            if (this.filter.query.bool.filter.length === 1) {
                this.filter.query.bool.filter[1] = {};
            }
            this.filter.query.bool.filter[1] = {
                or: [
                    { fuzzy: { title: term } },
                    { fuzzy: { title: term } }
                ]
            };
        }
        this.setFilter(this.filter);
    }
    getFilterString() {
        return JSON.stringify(this.filter);
    }
    setFilter(filter) {
        console.log(this.filter);
        this.filterSource.next(JSON.stringify(filter));
    }
};
FilterService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [])
], FilterService);
exports.FilterService = FilterService;
