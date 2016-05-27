import {Http, Response, HTTP_PROVIDERS} from '@angular/http';
import {Component, Injectable, Inject, Input, EventEmitter, forwardRef} from '@angular/core';
import {FeedSource} from './feedsource';
import {FeedSourceService} from './feedsource.service';
import {NgClass} from '@angular/common';
import {Feed} from './feed';
import {FeedService} from './feed.service';
import {FeedComponent} from './feed.component';

@Component({
  selector: 'feedsource',
  templateUrl: './app/feedsources.html',
  providers: [HTTP_PROVIDERS, FeedService, FeedSourceService],
  directives: [NgClass, FeedComponent],
  inputs: ['feedSource'],
  outputs: ['deleted']
})
@Injectable()
export class FeedSourceComponent {
  public expanded: boolean = false;
  public feeds: Feed[];
  public feedSource: FeedSource;
  public deleted = new EventEmitter();
  constructor(private feedService: FeedService, private feedSourceService: FeedSourceService) {
    this.feedService.feeds$.subscribe(feeds => this.feeds = feeds);
  }

  ngOnInit() {
    this.feedService.getFeeds(this.feedSource);
  }

  public changeExpand() {
    this.expanded = !this.expanded;
    this.feedService.getFeeds(this.feedSource);
  }

  public delete() {
    this.feedSourceService.deleteFeedSource(this.feedSource);
    this.deleted.emit('event');
  }

}
