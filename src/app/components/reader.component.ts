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
import {FilterService} from '../services/filter.service';
import {FilterComponent} from './filter.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app',
  templateUrl: './app/reader.html',
  providers: [FeedSourceService, FeedService, LabelService, RefreshService,
     HttpService, FilterService, HTTP_PROVIDERS],
  directives: [FeedComponent, FeedSourceComponent, LabelComponent, FilterComponent, NgClass]
})

@Injectable()
export class ReaderComponent {


  constructor(private refreshService: RefreshService, private userService: UserService,
    private router: Router){}

  ngOnInit() {
    console.log(this.userService.getUser());
    if (this.userService.getUser() !== null) {
      this.refreshService.startTimer();
    }
    else {
      this.router.navigateByUrl('/login');
    }
  }

  public logout() {
    this.userService.logoutUser();
    this.router.navigateByUrl('/login');
  }

}
