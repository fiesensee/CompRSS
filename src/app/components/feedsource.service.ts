///<reference path="../../../typings/modules/configstore/index.d.ts"/>
import {Injectable} from '@angular/core';
import {FeedSource} from './feedsource';
import {Subject} from 'rxjs/Subject';

const Configstore = require('configstore');

@Injectable()
export class FeedSourceService {

  public feedSourcesSource = new Subject<FeedSource[]>();
  public feedSources$ = this.feedSourcesSource.asObservable();
  private config;
  // public feedSources: FeedSource[] = [
  //   {'name': 'heise', 'url': 'http://www.heise.de/newsticker/heise.rdf'}
  // ];
  constructor() {
    this.config = new Configstore('FeedSources')
  }


  saveFeedSource(feedSource: FeedSource) {
    let feedSources: FeedSource[] = this.config.get('sources');
    feedSources.push(feedSource);
    this.config.set('sources', feedSources);
  }

  getFeedSources(){
    let feedSources: FeedSource[] = this.config.get('sources');
    this.feedSourcesSource.next(feedSources);
  }

  deleteFeedSource(feedSource: FeedSource){
    let feedSources: FeedSource[] = this.config.get('sources');
    let index: number = feedSources.findIndex(source => source.name == feedSource.name);
    feedSources.splice(index, 1)
    this.config.set('sources', feedSources);
  }
}
