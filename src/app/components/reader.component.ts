import {Component, Injectable, Inject} from '@angular/core';
import {HTTP_PROVIDERS, Http} from '@angular/http';
import {FeedSource} from '../models/feedsource';
import {FeedSourceComponent} from './feedsource.component';
import {FeedSourceFormComponent} from './feedsource-form.component';
import {FeedComponent} from './feed.component';
import {FeedSourceService} from '../services/feedsource.service';
import {FeedService} from '../services/feed.service';
import {UserService} from '../services/user.service';
import {Feed} from '../models/feed';
import {Label} from '../models/label';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app',
  templateUrl: './app/reader.html',
  providers: [FeedSourceService, FeedService, UserService, HTTP_PROVIDERS],
  directives: [FeedComponent, NgClass]
})

@Injectable()
export class ReaderComponent {

  public feedSources: FeedSource[];
  public feeds: Feed[] = []
  public labels: Label[]
  public feedSource = new FeedSource('','','')
  constructor(
    private feedSourceService: FeedSourceService,
    private feedService: FeedService,
    private userService: UserService
   ){
  // constructor(){
    this.feedSourceService.feedSources$.subscribe(sources => {this.feedSources = sources; console.log(sources)});
    this.feedService.feeds$.subscribe(feeds => this.feeds = feeds);
  }

  getFeeds(feedSources: FeedSource[]){

  }

  deleteFeedSource(feedSource: FeedSource){
    this.feedSourceService.deleteFeedSource(feedSource);
  }

  saveFeedSource(){
    this.feedSourceService.saveFeedSource(this.feedSource);
    this.feedSource = new FeedSource('', '','')
  }


  ngOnInit() {
    this.feedSourceService.startTimer();
  }

}
