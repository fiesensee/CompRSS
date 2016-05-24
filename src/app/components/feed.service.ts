import {Injectable} from 'angular2/core';
import {Feed} from './feed'
import {FeedSource} from './feedsource'
export class FeedService{
  getFeeds(source: FeedSource): Feed[]{
    let feeds: Feed[] = [];
    return feeds;
  }
}
