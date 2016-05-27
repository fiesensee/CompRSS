"use strict";
const app_component_1 = require('./components/app.component');
const platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
const http_1 = require('@angular/http');
platform_browser_dynamic_1.bootstrap(app_component_1.App, [http_1.HTTP_PROVIDERS]);
