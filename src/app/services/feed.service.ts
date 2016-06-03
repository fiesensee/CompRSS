/// <reference path="../../../typings/globals/jquery/index.d.ts"/>
import {Injectable} from '@angular/core';
import {Feed} from '../models/feed';
import {FeedSource} from '../models/feedsource';
import {FeedSourceService} from './feedsource.service';
import {Http, Headers} from '@angular/http';
import * as jQuery from 'jquery';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class FeedService{
  private feedsSource = new Subject<Feed[]>();
  public feeds$ = this.feedsSource.asObservable();
  public feeds: Feed[] = [];
    constructor(private http: Http){
  }
  getFeeds(feedSources: FeedSource[]){
    this.feeds = []
    if (feedSources.length == 0){
      this.feedsSource.next([]);
    }
    else {
      for (let feedSource of feedSources){
        this.http.get('http://localhost:8000/proxy/' + feedSource.sourceUrl).subscribe(res => this.parseRSS(res.text()));
      }
    }
  }

  parseRSS(xml: string){
    let feeds: Feed[] = [];
    let xmlDoc = jQuery.parseXML(xml);
    let $xml = $( xmlDoc );
    let $entries = $xml.find('item').each(function() {
      let feed: Feed = new Feed();
      feed.title = $(this).find('title').text();
      feed.text = $(this).find('description').text();
      feed.url = $(this).find('link').text();
      feed.date = new Date($(this).find('pubDate').text());
      feeds.push(feed);
    })
    this.feeds = this.feeds.concat(feeds);
    this.feeds.sort((feeda, feedb) => feedb.date.valueOf() - feeda.date.valueOf())
    this.feedsSource.next(this.feeds);
  }
}
