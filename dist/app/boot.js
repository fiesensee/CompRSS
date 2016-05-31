"use strict";
const router_component_1 = require('./components/router.component');
const platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
const http_1 = require('@angular/http');
const router_1 = require('@angular/router');
platform_browser_dynamic_1.bootstrap(router_component_1.RouterComponent, [http_1.HTTP_PROVIDERS, router_1.ROUTER_PROVIDERS]);
