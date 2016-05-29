///<reference path="../../../typings/modules/configstore/index.d.ts"/>
import {Injectable} from '@angular/core';
import {FeedSource} from './feedsource';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class FeedSourceService {

  public feedSourcesSource = new Subject<FeedSource[]>();
  public feedSources$ = this.feedSourcesSource.asObservable();
  public feedSources: FeedSource[] = [
    {'name': 'heise', 'url': 'http://www.heise.de/newsticker/heise.rdf'}
  ];
  constructor() {
  }


  saveFeedSource(feedSource: FeedSource) {
  }

  getFeedSources(){
    this.feedSourcesSource.next(this.feedSources);
  }

  deleteFeedSource(feedSource: FeedSource){
  }
}
