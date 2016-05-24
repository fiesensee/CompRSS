import {Component, Injectable, Inject} from 'angular2/core';
import {FeedSourceComponent} from './feedsource.component';
import {NgForm} from 'angular2/common';
import {FeedSourceFormComponent} from './feedsource-form.component'
import {FeedSource} from './feedsource';
import {FeedSourceService} from './feedsource.service';


@Component({
  selector: 'app',
  templateUrl: './app/app.html',
  providers: [FeedSourceComponent, FeedSourceFormComponent, FeedSource, FeedSourceService],
  directives: [FeedSourceComponent, FeedSourceFormComponent]
})
@Injectable()
export class App {

  constructor(public feedSourceComponent: FeedSourceComponent){
  }
  // refresh(){
  //   for(let source of this.sources){
  //     source.getFeed();
  //   }
  // }
}
