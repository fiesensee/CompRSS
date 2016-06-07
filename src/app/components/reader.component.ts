import {Component, Injectable, Inject} from '@angular/core';
import {HTTP_PROVIDERS, Http} from '@angular/http';
import {FeedSource} from '../models/feedsource';
import {FeedSourceComponent} from './feedsource.component';
import {FeedSourceFormComponent} from './feedsource-form.component';
import {FeedComponent} from './feed.component';
import {LabelComponent} from './label.component';
import {FeedSourceService} from '../services/feedsource.service';
import {FeedService} from '../services/feed.service';
import {UserService} from '../services/user.service';
import {LabelService} from '../services/label.service';
import {RefreshService} from '../services/refresh.service';
import {Feed} from '../models/feed';
import {Label} from '../models/label';
import {NgClass} from '@angular/common';
import {Observable} from 'rxjs/Rx';
import {HttpService} from '../services/http.service';

@Component({
  selector: 'app',
  templateUrl: './app/reader.html',
  providers: [FeedSourceService, FeedService, LabelService,
     UserService, RefreshService, HttpService, HTTP_PROVIDERS],
  directives: [FeedComponent, FeedSourceComponent, LabelComponent, NgClass]
})

@Injectable()
export class ReaderComponent {


  constructor(private refreshService: RefreshService){}

  ngOnInit() {
    // this.userService.getToken();
    // this.startTimer();
    this.refreshService.startTimer();
  }

  // startTimer(){
  //   let timer = Observable.timer(1500,1000 * 60 * 5);
  //   timer.subscribe(t => {
  //     console.log('refreshing');
  //     this.refresh();
  //   });
  // }
  //
  // refresh() {
  //   this.userService.getToken();
  //   let timer = Observable.timer(1000);
  //   timer.subscribe(t => {
  //     this.feedSourceService.getFeedSources();
  //     this.labelService.getLabels();
  //   })
  // }

}
