///<reference path="../../../typings/modules/configstore/index.d.ts"/>
import {Injectable} from '@angular/core';
import {FeedSource} from '../models/feedsource';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Rx';
import {Http, Headers} from '@angular/http';
import {UserService} from './user.service';

@Injectable()
export class FeedSourceService {

  public feedSourcesSource = new Subject<FeedSource[]>();
  public feedSources$ = this.feedSourcesSource.asObservable();
  public token;
  // public feedSources: FeedSource[] = [
  //   {'name': 'zeit', 'url': 'http://newsfeed.zeit.de/index'},
  //   {'name': 'faz', 'url': 'http://www.faz.net/rss/aktuell/'}
  // ];
  constructor(private http: Http, private userService: UserService) {
    this.userService.token$.subscribe(token => this.token = token);
    this.userService.getToken()
    // this.userService.token$.subscribe(token => console.log(token.toString()));
  }

  startTimer() {
      let timer = Observable.timer(1000,1000 * 60 * 5);
      timer.subscribe(t => this.refresh());
  }

  refresh() {
    this.userService.getToken();
    this.getFeedSources();
  }

  saveFeedSource(feedSource: FeedSource) {
    let headers = new Headers()
    headers.append('Authorization', 'Bearer '+ this.token.toString());
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let body = [
      'name=' + feedSource.name,
      'sourceUrl=' + feedSource.sourceUrl
    ]
    this.http.post('http://localhost:8000/feedsources/', body.join('&'),{headers: headers})
      .subscribe(res => {this.getFeedSources(); console.log('saved')});

  }

  getFeedSources(){
    console.log('test');
    let headers = new Headers()
    headers.append('Authorization', 'Bearer '+ this.token.toString());
    this.http.get('http://localhost:8000/feedsources/', {headers: headers})
      .subscribe(sources => {this.feedSourcesSource.next(sources.json().results);console.log(sources.json().results)});
  }


  deleteFeedSource(targetSource: FeedSource){
    let headers = new Headers()
    headers.append('Authorization', 'Bearer '+ this.token.toString());
    this.http.delete(targetSource.url, {headers: headers})
      .subscribe(res => this.getFeedSources());
  }

}
