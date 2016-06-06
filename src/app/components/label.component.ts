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
  public feedSources: FeedSource[] = [];
  public labels: Label[];
  public newLabel: Label = new Label('',[], '', 0, false);
  constructor(
    private labelService: LabelService,
    private refreshService: RefreshService,
    private feedSourceService: FeedSourceService
  ) {
      this.labelService.labels$.subscribe(labels => {
        this.labels = labels;
        this.setLabels(labels);
        this.refreshFeedSources();
      });
      this.feedSourceService.feedSources$.subscribe(sources => {
        this.feedSources = sources;
      });
  }

  setFeedSources(sources: FeedSource[]) {
    let activeSources = this.getActiveSources();
    activeSources.forEach(source => source.active = false);
    sources.forEach(source => {
      activeSources.forEach(activeSource => {
        if (source === activeSource) {
          source.active = true;
        }
      });
    });
    this.feedSources = sources;
  }

  setLabels(labels) {
    let activeLabels = this.labels.filter(label => label.active);
    if (activeLabels.length === 0) {
      this.labels = labels;
    };
    activeLabels.forEach(label => label.active = false);
    labels.forEach(label => {
      activeLabels.forEach(activeLabel => {
        if (label === activeLabel) {
          label.active = true;
        }
      });
    });
    this.labels = labels;
  }

  refreshFeedSources() {
    let activeSources = this.getActiveSources();
    this.feedSources.forEach(source => {
      source.active = false;
      activeSources.forEach(activeSource => {
        if (source.url === activeSource.url) {
          source.active = true;
        }
      });
    });
  }

  deleteLabel(label: Label){
    this.labelService.deleteLabel(label);

    // this.activeLabel = this.defaultLabel;
  }

  saveNewLabel(){
    this.newLabel.feedSources = this.getActiveSources();
    this.labelService.saveLabel(this.newLabel);
    this.newLabel = new Label('', [], '', 0, false);
  }

  setActiveSources(args) {
    let feedSource = args.value;
    let activeLabels = this.labels.filter(label => label.active);
    activeLabels.forEach(label => {
      let index = label.feedSources.findIndex(source => source.url === feedSource.url);
      if (feedSource.active) {
        if (index === -1) {
          // label.feedSources.splice(index,1);
          label.feedSources.push(feedSource);
        }
      }
      else {
        if (index > -1) {
          label.feedSources.splice(index,1);
        }
      }
      this.labelService.updateLabel(label);
    });
    this.refreshFeedSources();
    this.refreshFeeds();
  }

  refreshFeeds() {
    this.refreshService.setAndRefreshFeedSources(this.getActiveSources());
  }

  getActiveSources(): FeedSource[] {
    let activeLabels = this.labels.filter(label => label.active);
    if (activeLabels.length === 0) {
      return [];
    }
    let activeSources = [];
    activeLabels.forEach(activeLabel => {
      activeLabel.feedSources.forEach(activeSource => {
        if (activeSources.findIndex(source => source === activeSource) === -1) {
          activeSources.push(activeSource);
        }
      });
    });
    return activeSources;
  }

  changeActive(targetLabel: Label) {
    targetLabel.active = !targetLabel.active
    this.refreshFeedSources();
    this.refreshFeeds();
  }

}
