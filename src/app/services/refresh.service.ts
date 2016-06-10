import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Rx';
import {UserService} from '../services/user.service';
import {FeedSourceService} from '../services/feedsource.service';
import {FeedService} from '../services/feed.service';
import {LabelService} from '../services/label.service';
import {FeedSource} from '../models/feedsource';

@Injectable()
export class RefreshService {
  private refreshSource = new Subject();
  public refresh$ = this.refreshSource.asObservable();
  private activeFeedSources: FeedSource[] = [];

  constructor(
    private userService: UserService,
    private feedSourceService: FeedSourceService,
    private feedService: FeedService,
    private labelService: LabelService
    ){

  }

  public startTimer() {
    this.userService.getToken();
    let timer = Observable.timer(1000,1000 * 60 * 5);
    timer.subscribe(t => {
      console.log('refreshing');
      this.refresh_all();
    });
  }

  public setAndRefreshFeedSources(feedSources: FeedSource[]) {
    this.feedService.setFeedSources(feedSources);
    this.feedService.getFeeds();
  }

  public refresh_all() {
    this.userService.getToken();
    let timer = Observable.timer(1000);
    timer.subscribe(t => {
      this.feedSourceService.getFeedSources();
      this.labelService.getLabels();
      this.feedService.getFeeds();
    });
  }
}
