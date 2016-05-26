import {Component, Injectable, Inject} from 'angular2/core';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import {FeedSource} from './feedsource';
import {FeedSourceComponent} from './feedsource.component';
import {FeedSourceFormComponent} from './feedsource-form.component';
import {FeedSourceService} from './feedsource.service';
import * as ConfigStore from 'configstore';

@Component({
  selector: 'app',
  templateUrl: './app/app.html',
  providers: [HTTP_PROVIDERS, FeedSource, FeedSourceService, ConfigStore],
  directives: [FeedSourceFormComponent, FeedSourceComponent]
})

@Injectable()
export class App {

  public feedSources: FeedSource[];
  constructor(private feedSourceService: FeedSourceService){
    this.feedSourceService.feedSources$.subscribe(sources => this.feedSources = sources)
  }

  ngOnInit() {
    this.feedSourceService.getFeedSources();
  }
  refresh(){
    this.feedSourceService.getFeedSources()
  }
}
