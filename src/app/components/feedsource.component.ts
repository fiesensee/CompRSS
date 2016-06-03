import {Http} from '@angular/http';
import {Component, Injectable, Input, EventEmitter} from '@angular/core';
import {FeedSource} from '../models/feedsource';
import {FeedSourceService} from '../services/feedsource.service';
import {NgClass} from '@angular/common';
import {FeedComponent} from './feed.component';

@Component({
  selector: 'feedsources',
  templateUrl: './app/feedsources.html',
  directives: [NgClass, FeedComponent],
  inputs: ['feedSources'],
  outputs: ['changed','emitSources']
})
@Injectable()
export class FeedSourceComponent {
  public feedSources: FeedSource[];
  public newFeedSource: FeedSource = new FeedSource('','','', false);
  public changed = new EventEmitter();
  public emitSources = new EventEmitter();

  constructor(private feedSourceService: FeedSourceService) {
    // this.feedSourceService.feedSources$.subscribe(sources => this.feedSources = sources);
  }

  deleteFeedSource(feedSource: FeedSource){
    this.feedSourceService.deleteFeedSource(feedSource);
    this.changed.emit('event');
  }

  saveFeedSource(){
    this.feedSourceService.saveFeedSource(this.newFeedSource);
    this.newFeedSource = new FeedSource('', '', '', false);
    this.changed.emit('event');
  }

  changeActive(feedSource: FeedSource) {
    let index = this.feedSources.indexOf(feedSource);
    let targetSource = this.feedSources[index];
    targetSource.active = !targetSource.active;
    this.feedSources[index] = targetSource
    this.emitSources.emit({value: this.feedSources});
  }


}
