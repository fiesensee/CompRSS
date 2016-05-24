"use strict";
const app_component_1 = require('./components/app.component');
const browser_1 = require('angular2/platform/browser');
const http_1 = require('angular2/http');
browser_1.bootstrap(app_component_1.App, [http_1.HTTP_PROVIDERS]);
