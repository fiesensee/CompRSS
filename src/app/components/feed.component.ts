import {Component, Injectable} from '@angular/core';
import {Feed} from '../models/feed';
import {FeedService} from '../services/feed.service';

@Component({
  selector: 'feeds',
  templateUrl: './app/feed.html'
})

@Injectable()
export class FeedComponent {
  private feeds: Feed[];
  constructor(
    private feedService: FeedService
  ){
    this.feedService.feeds$.subscribe(feeds => this.feeds = feeds);
  }
}
