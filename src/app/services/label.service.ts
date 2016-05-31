import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {FeedSource} from '../models/feedsource';
import {Label} from '../models/label';

export class LabelService {
  private labelSource = new Subject<Label>();
  public label$ = this.labelSource.asObservable();

  setActiveLabel(label) {
    this.labelSource.next(label);
  }
}
