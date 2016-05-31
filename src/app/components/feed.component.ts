import {Component, Injectable} from '@angular/core';
import {Feed} from '../models/feed';
import {FeedService} from '../services/feed.service';
import {LabelService} from '../services/label.service';

@Component({
  selector: 'feeds',
  templateUrl: './app/feed.html',
  providers: [FeedService, LabelService]
})
@Injectable()
export class FeedComponent {
  private feeds: Feed[];
  constructor(private feedService: FeedService){
    this.feedService.feeds$.subscribe(feeds => this.feeds = feeds)
  }
}
