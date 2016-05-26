import {Component, Injectable, EventEmitter} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {FeedSource} from './feedsource'
import {FeedSourceService} from './feedsource.service';
import * as ConfigStore from 'configstore';

@Component({
  selector: 'feedsource-form',
  templateUrl: './app/feedsource-form.html',
  providers: [FeedSourceService, FeedSource, ConfigStore],
  outputs: ['created']
})
@Injectable()
export class FeedSourceFormComponent {

  active = false;
  public created = new EventEmitter();
  constructor(private feedSourceService: FeedSourceService,
    private feedsource: FeedSource) {
  }

  switchActive() {
    this.active = !this.active;
  }

  onSubmit() {
    this.feedSourceService.saveFeedSource(this.feedsource)
    this.created.emit('event');
    this.feedsource = new FeedSource('', '')
    this.switchActive();
  }
}
