///<reference path="../../../typings/modules/configstore/index.d.ts"/>
import {Injectable} from 'angular2/core';
import {FeedSource} from './feedsource';
import * as ConfigStore from 'configstore';

@Injectable()
export class FeedSourceService {

  constructor(private config: ConfigStore,
    private feedSources) {
      this.feedSources = [];
      this.config = new ConfigStore('FeedSources', {sources: this.feedSources})
  }


  saveFeedSource(feedsource: FeedSource) {
    this.feedSources = this.config.get('sources')
    this.feedSources.push(feedsource)
    this.config.set('sources', this.feedSources)
  }

  getFeedSources(){
    return this.config.get('sources')
  }
}
