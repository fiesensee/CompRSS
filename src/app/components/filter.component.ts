import {Component, Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {FilterService} from '../services/filter.service';
import {FeedService} from '../services/feed.service';

@Component({
  selector: 'filter',
  templateUrl: './app/filter.html'
})
@Injectable()
export class FilterComponent {
  constructor(private filterService: FilterService, private feedService: FeedService) {
    this.filterService.filter$.subscribe(filter => {
      this.feedService.queryFeeds()
    });
  }

  public setDateRange(days: number) {
    this.filterService.setDateRange(days);
  }

  public searchTerm(term: string) {
    this.filterService.setTermQuery(term);
  }
}
