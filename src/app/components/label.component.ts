import {Http} from '@angular/http';
import {Component, Injectable, Input, EventEmitter} from '@angular/core';
import {NgClass} from '@angular/common';
import {LabelService} from '../services/label.service';
import {FeedSourceService} from '../services/feedsource.service';
import {Label} from '../models/label';
import {FeedSourceComponent} from './feedsource.component';
import {FeedSource} from '../models/feedsource';
import {RefreshService} from '../services/refresh.service';

@Component({
  selector: 'labels',
  templateUrl: './app/labels.html',
  directives: [NgClass, FeedSourceComponent],
  inputs: ['labels'],
  outputs: ['changed']
})
@Injectable()
export class LabelComponent {
  public defaultLabel = new Label('Default', [], '', true);
  public activeLabel = this.defaultLabel;
  public labels: Label[];
  public newLabel: Label = new Label('',[], '', false);
  public activeSources: FeedSource[]
  constructor(
    private labelService: LabelService,
    private refreshService: RefreshService,
    private feedSourceService: FeedSourceService
  ) {
    this.labelService.labels$.subscribe(labels => this.labels = labels);
    this.feedSourceService.feedSources$.subscribe(sources => {
      this.defaultLabel.feedSources = sources;
      this.refreshActiveLabel();
    });
  }

  refreshActiveLabel() {
    let tmpLabel = this.defaultLabel
    for(let source of this.activeLabel.feedSources){
      if(source.active){
        let index = tmpLabel.feedSources.indexOf(source);
        tmpLabel.feedSources[index].active = true;
      }
    }
    this.activeLabel = tmpLabel;
    this.refreshFeeds();
  }

  deleteLabel(label: Label){
    this.labelService.deleteLabel(label);
    this.activeLabel = this.defaultLabel;
  }

  saveNewLabel(){
    this.newLabel.feedSources = this.activeLabel.feedSources;
    this.labelService.saveLabel(this.newLabel);
    this.newLabel = new Label('', [], '', false);
  }

  updateActiveLabel() {
    this.labelService.updateLabel(this.activeLabel)
  }

  setActiveSources(args) {
    this.activeLabel.feedSources = args.value;
    this.refreshFeeds();
    this.updateActiveLabel();
  }

  refreshFeeds() {
    this.activeSources = [];
    for(let source of this.activeLabel.feedSources){
      if(source.active){
        this.activeSources.push(source);
      }
    }
    this.refreshService.setAndRefreshFeedSources(this.activeSources);
  }

}
