import {Component, Injectable, EventEmitter} from '@angular/core';
import {NgForm} from '@angular/common';
import {FeedSource} from '../models/feedsource'
import {FeedSourceService} from '../services/feedsource.service';

@Component({
  selector: 'feedsource-form',
  templateUrl: './app/feedsource-form.html',
  providers: [FeedSourceService],
  outputs: ['created']
})
@Injectable()
export class FeedSourceFormComponent {

  active = false;
  public created = new EventEmitter();
  private feedsource: FeedSource
  constructor(private feedSourceService: FeedSourceService) {
  }

  switchActive() {
    this.active = !this.active;
  }

  onSubmit() {
    this.feedSourceService.saveFeedSource(this.feedsource)
    this.created.emit('event');

    this.switchActive();
  }
}
