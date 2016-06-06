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
const http_1 = require('@angular/http');
const user_service_1 = require('./user.service');
let LabelService = class LabelService {
    constructor(http, userService) {
        this.http = http;
        this.userService = userService;
        this.labelSource = new Subject_1.Subject();
        this.labels$ = this.labelSource.asObservable();
    }
    saveLabel(label) {
        let headers = new http_1.Headers();
        let token = this.userService.token;
        headers.append('Authorization', 'Bearer ' + token.toString());
        headers.append('Content-Type', 'application/json');
        let body = { name: label.name };
        this.http.post('http://localhost:8000/labels/', JSON.stringify(body), { headers: headers })
            .subscribe(res => { this.getLabels(); this.updateLabel(label); console.log('saved'); });
    }
    updateLabel(label) {
        let headers = new http_1.Headers();
        let token = this.userService.token;
        headers.append('Authorization', 'Bearer ' + token.toString());
        headers.append('Content-Type', 'application/json');
        let body = [
            { labelId: label.id, feedSourceIds: [] }
        ];
        for (let source of label.feedSources) {
            body[0].feedSourceIds.push(source.id);
        }
        console.log(JSON.stringify(body));
        this.http.post('http://localhost:8000/updatefeedsourcelabels/', JSON.stringify(body), { headers: headers })
            .subscribe(res => { this.getLabels(); console.log('saved'); });
    }
    deleteLabel(label) {
        let headers = new http_1.Headers();
        let token = this.userService.token;
        headers.append('Authorization', 'Bearer ' + token.toString());
        this.http.delete(label.url, { headers: headers })
            .subscribe(res => this.getLabels());
    }
    getLabels() {
        let headers = new http_1.Headers();
        let token = this.userService.token;
        headers.append('Authorization', 'Bearer ' + token.toString());
        this.http.get('http://localhost:8000/labels/', { headers: headers })
            .subscribe(labels => this.labelSource.next(labels.json()));
    }
};
LabelService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [http_1.Http, user_service_1.UserService])
], LabelService);
exports.LabelService = LabelService;
