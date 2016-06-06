import {Http} from '@angular/http';
import {Component, Injectable, Input, EventEmitter} from '@angular/core';
import {FeedSource} from '../models/feedsource';
import {FeedSourceService} from '../services/feedsource.service';
import {NgClass} from '@angular/common';
import {FeedComponent} from './feed.component';
import {RefreshService} from '../services/refresh.service';

@Component({
  selector: 'feedsources',
  templateUrl: './app/feedsources.html',
  directives: [NgClass, FeedComponent],
  inputs: ['feedSources'],
  outputs: ['emitSources', 'emitActiveChange']
})
@Injectable()
export class FeedSourceComponent {
  public feedSources: FeedSource[];
  public newFeedSource: FeedSource = new FeedSource('','','', 0);
  public emitSources = new EventEmitter();
  public emitActiveChange = new EventEmitter();

  constructor(private feedSourceService: FeedSourceService, private refreshService: RefreshService) {
  }

  deleteFeedSource(feedSource: FeedSource){
    this.feedSourceService.deleteFeedSource(feedSource);
    if (feedSource.active){
      this.changeActive(feedSource)
    }
    this.refreshService.refresh_all()
  }

  saveFeedSource(){
    this.feedSourceService.saveFeedSource(this.newFeedSource);
    this.newFeedSource = new FeedSource('', '', '', 0);
    this.refreshService.refresh_all()
  }

  changeActive(feedSource: FeedSource) {
    feedSource.active = !feedSource.active;
    this.emitActiveChange.emit({value: feedSource});
  }


}
