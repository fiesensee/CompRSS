import {Component, Injectable, Inject} from '@angular/core';
import {HTTP_PROVIDERS, Http} from '@angular/http';
import {FeedSource} from './feedsource';
import {FeedSourceComponent} from './feedsource.component';
import {FeedSourceFormComponent} from './feedsource-form.component';
import {FeedSourceService} from './feedsource.service';


@Component({
  selector: 'app',
  templateUrl: './app/app.html',
  providers: [FeedSourceService, HTTP_PROVIDERS],
  directives: [FeedSourceFormComponent, FeedSourceComponent]
})

@Injectable()
export class App {

  public feedSources: FeedSource[];
  constructor(private feedSourceService: FeedSourceService){
  // constructor(){
    this.feedSourceService.feedSources$.subscribe(sources => this.feedSources = sources)
  }

  ngOnInit() {
    this.feedSourceService.getFeedSources();
  }
  refresh(){
    this.feedSourceService.getFeedSources()
  }
}
