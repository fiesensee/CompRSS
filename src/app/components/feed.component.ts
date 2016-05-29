///<reference path="../../../typings/globals/open/index.d.ts"/>
import {Component} from '@angular/core';
import {Feed} from './feed';

@Component({
  selector: 'feed',
  templateUrl: './app/feed.html',
  inputs: ['feed']
})
export class FeedComponent {
  private feed: Feed;
  public expanded: boolean = false;

  redirectToSource() {
  }

  changeExpand(){
    this.expanded = !this.expanded;
  }
}
