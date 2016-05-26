/// <reference path="../../../typings/globals/jquery/index.d.ts"/>
import {Injectable} from 'angular2/core';
import {Feed} from './feed'
import {FeedSource} from './feedsource'
import {Http} from 'angular2/http';
import * as jQuery from 'jquery';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class FeedService{
  private feedsSource = new Subject<Feed[]>();
  public feeds$ = this.feedsSource.asObservable();
  constructor(private http: Http){}
  getFeeds(source: FeedSource){
    this.http.get(source.url).subscribe(res => this.parseRSS(res.text()));
  }

  parseRSS(xml: string){
    let feeds: Feed[] = [];
    let xmlDoc = jQuery.parseXML(xml);
    let $xml = $( xmlDoc );
    let $entries = $xml.find('entry').each(function() {
      let feed: Feed = new Feed('','','','');
      feed.title = $(this).find('title').text();
      feed.text = $(this).find('summary').text();
      feed.url = $(this).find('link').attr('href').toString();
      feed.date = $(this).find('updated').text();
      // console.log($(this).find('link').attr('href').toString());
      // console.log('test');
      feeds.push(feed);
    })
    this.feedsSource.next(feeds);
  }
}
