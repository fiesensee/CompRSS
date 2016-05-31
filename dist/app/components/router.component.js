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
const router_1 = require('@angular/router');
const reader_component_1 = require('./reader.component');
const feedsource_component_1 = require('./feedsource.component');
const label_component_1 = require('./label.component');
let RouterComponent = class RouterComponent {
};
RouterComponent = __decorate([
    core_1.Component({
        selector: 'router',
        directives: [router_1.ROUTER_DIRECTIVES],
        template: `<a [routerLink]="['/reader']">reader</a>test<router-outlet></router-outlet>`
    }),
    router_1.Routes([
        { path: '/feedsources', component: feedsource_component_1.FeedSourceComponent },
        { path: '/labels', component: label_component_1.LabelComponent },
        { path: '/reader', component: reader_component_1.ReaderComponent },
        { path: '*', component: reader_component_1.ReaderComponent }
    ]), 
    __metadata('design:paramtypes', [])
], RouterComponent);
exports.RouterComponent = RouterComponent;
