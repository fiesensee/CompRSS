import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class FilterService {
  private filter;
  private filterSource = new Subject<string>();
  public filter$ = this.filterSource.asObservable();

  constructor() {
    this.filter = {
      sort: [{date:{order: "desc"}}],
      query: {bool: {
        filter: [
          {range: {date: {gte: "now-1d/d"}}},
          {match_all: {}}
        ]
      }}
    };
  }

  public setDateRange(days: number) {
    this.filter.query.bool.filter[0].range.date.gte = "now-" + days.toString() + "d/d";
    this.setFilter(this.filter);
  }

  public setTermQuery(term: string) {
    if (term === '') {
      this.filter.query.bool.filter[1] = {match_all: {}};
    }
    else {
      this.filter.query.bool.filter[1] = {
        or: [
          {fuzzy: {title: term}},
          {fuzzy: {description: term}}
        ]
      }
    }
    this.setFilter(this.filter);
  }

  public getFilterString(): string{
    return  JSON.stringify(this.filter)
  }

  public setFilter(filter: {}) {
    this.filterSource.next(JSON.stringify(filter));
  }
}
