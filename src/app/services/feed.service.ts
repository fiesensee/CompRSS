/// <reference path="../../../typings/globals/jquery/index.d.ts"/>
import {Injectable} from '@angular/core';
import {Feed} from '../models/feed';
import {FeedSource} from '../models/feedsource';
import {FeedSourceService} from './feedsource.service';
import {Http, Headers} from '@angular/http';
import * as jQuery from 'jquery';
import {Subject} from 'rxjs/Subject';
import {HttpService} from './http.service';
import {FilterService} from './filter.service';

@Injectable()
export class FeedService{
  private feedsSource = new Subject<Feed[]>();
  public feeds$ = this.feedsSource.asObservable();
  public feeds: Feed[] = [];
  public feedSources: FeedSource[] = [];
  private filter: string;
    constructor(private http: HttpService, private filterService: FilterService){
      this.filter = this.filterService.getFilterString();
  }

  setFeedSources(feedSources: FeedSource[]) {
    this.feedSources = feedSources;
  }

  getFeeds(){
    let feedSources = this.feedSources
    this.feeds = []
    if (feedSources.length == 0){
      this.feedsSource.next([]);
    }
    else {
      let body = [];
      for (let feedSource of feedSources) {
        body.push(feedSource.sourceUrl)
      }
      this.http.post('getfeeds/',JSON.stringify(body))
        .subscribe(res => this.queryFeeds())
    }
  }

  queryFeeds() {
    this.filter = this.filterService.getFilterString();
    this.http.queryES('feeds/feed/_search?size=300', this.filter)
      .subscribe(res => this.setFeeds(res.json().hits.hits));
  }

  setFeeds(queryHits) {
    let feeds = [];
    for (let hit of queryHits) {
      hit._source.date = new Date(hit._source.date);
      feeds.push(hit._source);
    }
    this.feedsSource.next(feeds);
  }
}
