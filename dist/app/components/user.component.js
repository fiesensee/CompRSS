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
const user_service_1 = require('../services/user.service');
const common_1 = require('@angular/common');
const user_1 = require('../models/user');
const router_1 = require('@angular/router');
let UserComponent = class UserComponent {
    constructor(userService, router) {
        this.userService = userService;
        this.router = router;
        this.register = false;
        this.authFailure = false;
        this.user = new user_1.User();
        this.newUser = new user_1.User();
    }
    login() {
        let request = this.userService.loginUser(this.user);
        request.subscribe(res => {
            console.log(res.status);
            this.authFailure = false;
            this.router.navigateByUrl('/reader');
        }, err => {
            console.log(err.status);
            this.authFailure = true;
        });
    }
    registerNewUser() {
    }
};
UserComponent = __decorate([
    core_1.Component({
        selector: 'landing',
        templateUrl: './app/landing.html',
        directives: [common_1.NgClass]
    }),
    core_1.Injectable(), 
    __metadata('design:paramtypes', [user_service_1.UserService, router_1.Router])
], UserComponent);
exports.UserComponent = UserComponent;
