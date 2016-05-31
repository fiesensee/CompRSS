import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Routes} from '@angular/router';
import {NgForm} from '@angular/common';
import {ReaderComponent} from './reader.component';
import {FeedSourceComponent} from './feedsource.component';
import {LabelComponent} from './label.component';


@Component({
  selector: 'router',
  directives: [ROUTER_DIRECTIVES],
  template: `<a [routerLink]="['/reader']">reader</a>test<router-outlet></router-outlet>`
})
@Routes([
  {path: '/feedsources', component: FeedSourceComponent},
  {path: '/labels', component: LabelComponent},
  {path: '/reader', component: ReaderComponent},
  {path: '*', component: ReaderComponent}
])
export class RouterComponent {}
