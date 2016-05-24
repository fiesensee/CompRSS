import {Component, Injectable} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {FeedSource} from './feedsource'
import {FeedSourceService} from './feedsource.service';
import * as ConfigStore from 'configstore';

@Component({
  selector: 'feedsource-form',
  templateUrl: './app/feedsource-form.html',
  providers: [FeedSourceService, FeedSource, ConfigStore]
})
@Injectable()
export class FeedSourceFormComponent {

  active = false;

  constructor(private feedSourceService: FeedSourceService,
    private feedsource: FeedSource) {
  }

  switchActive() {
    this.active = !this.active;
  }

  onSubmit() {
    this.feedSourceService.saveFeedSource(this.feedsource)
    this.feedsource = new FeedSource('', '')
    this.switchActive();
  }
}
