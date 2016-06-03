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
  constructor(private http: Http, private userService: UserService) {
  }


  saveFeedSource(feedSource: FeedSource) {
    let headers = new Headers()
    let token = this.userService.token;
    headers.append('Authorization', 'Bearer '+ token.toString());
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let body = [
      'name=' + feedSource.name,
      'sourceUrl=' + feedSource.sourceUrl
    ]
    this.http.post('http://localhost:8000/feedsources/', body.join('&'),{headers: headers})
      .subscribe(res => {this.getFeedSources(); console.log('saved')});

  }

  getFeedSources(){
    let headers = new Headers();
    let token = this.userService.token;
    headers.append('Authorization', 'Bearer '+ token.toString());
    this.http.get('http://localhost:8000/feedsources/', {headers: headers})
      .subscribe(sources => this.feedSourcesSource.next(sources.json().results));
  }


  deleteFeedSource(targetSource: FeedSource){
    let headers = new Headers();
    let token = this.userService.token;
    headers.append('Authorization', 'Bearer '+ token.toString());
    this.http.delete(targetSource.url, {headers: headers})
      .subscribe(res => this.getFeedSources());
  }

}
