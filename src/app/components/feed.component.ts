import {Component} from 'angular2/core';
import {Feed} from './feed';

@Component({
  selector: 'feed',
  templateUrl: './app/feed.html',
  inputs: ['feed']
})
export class FeedComponent {
  private feed: Feed;
  ngOnInit() {
  }
}
