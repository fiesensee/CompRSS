/// <reference path="../../../typings/globals/jquery/index.d.ts"/>
import {Injectable} from '@angular/core';
import {Feed} from './feed'
import {FeedSource} from './feedsource'
import {Http, Headers} from '@angular/http';
import * as jQuery from 'jquery';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class FeedService{
  private feedsSource = new Subject<Feed[]>();
  public feeds$ = this.feedsSource.asObservable();
  constructor(private http: Http){}
  getFeeds(source: FeedSource){
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    headers.append('Access-Control-Allow-Methods', 'POST,PUT,GET,DELETE,OPTIONS');
    this.http.get('http://cors.io/?u=' + source.url).subscribe(res => this.parseRSS(res.text()));
  }

  parseRSS(xml: string){
    let feeds: Feed[] = [];
    let xmlDoc = jQuery.parseXML(xml);
    let $xml = $( xmlDoc );
    let $entries = $xml.find('item').each(function() {
      let feed: Feed = new Feed('','','', new Date());
      feed.title = $(this).find('title').text();
      feed.text = $(this).find('description').text();
      feed.url = $(this).find('link').text();
      feed.date = new Date($(this).find('pubDate').text());
      feeds.push(feed);
    })
    this.feedsSource.next(feeds);
  }
}
