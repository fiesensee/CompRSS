import {FeedSource} from './components/app.component';
import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS, Http} from 'angular2/http';

bootstrap(FeedSource, [HTTP_PROVIDERS]);
