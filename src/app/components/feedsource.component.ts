import {Http, Response, HTTP_PROVIDERS} from 'angular2/http';
import {Component, Injectable, Inject} from 'angular2/core';
import {FeedSourceFormComponent} from './feedsource-form.component';
import {FeedSource} from './feedsource';
import {FeedSourceService} from './feedsource.service';

@Component({
  selector: 'feedsources',
  templateUrl: './app/feedsources.html',
  providers: [Http, HTTP_PROVIDERS]
})
@Injectable()
export class FeedSourceComponent {
  constructor(private http: Http, public feedSources: FeedSource,
    private feedSourceService: FeedSourceService) {
    // http.get('http://www.heise.de/newsticker/heise-atom.xml').subscribe(res => this.target = res.text())
    // this.test()
    this.feedSources = this.feedSourceService.getFeedSources();
  }



}
