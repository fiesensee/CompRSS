// import {App} from './components/app.component';
import {RouterComponent} from './components/router.component';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from '@angular/http';
import {ROUTER_PROVIDERS} from '@angular/router';


bootstrap(RouterComponent, [HTTP_PROVIDERS, ROUTER_PROVIDERS]);
