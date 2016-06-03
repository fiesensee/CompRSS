import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {FeedSource} from '../models/feedsource';
import {Label} from '../models/label';
import {Http, Headers} from '@angular/http';
import {UserService} from './user.service';

@Injectable()
export class LabelService {

  private labelSource = new Subject<Label[]>();
  public labels$ = this.labelSource.asObservable();
  constructor(private http: Http, private userService: UserService){}

  saveLabel(label: Label){
    let headers = new Headers()
    let token = this.userService.token;
    headers.append('Authorization', 'Bearer '+ token.toString());
    headers.append('Content-Type', 'application/json');
    let body = [
      {name: label.name, feedSources: []}
    ]
    for (let source of label.feedSources) {
      body[0].feedSources.push(source)
    }
    console.log(JSON.parse(JSON.stringify(body)))
    this.http.post('http://localhost:8000/labels/', JSON.parse(JSON.stringify(body)),{headers: headers})
      .subscribe(res => {this.getLabels(); console.log('saved')});
  }

  updateLabel(label: Label) {
    let headers = new Headers()
    let token = this.userService.token;
    headers.append('Authorization', 'Bearer '+ token.toString());
    headers.append('Content-Type', 'application/json');
    let body = [
      {name: label.name, feedSources: []}
    ]
    for (let source of label.feedSources) {
      body[0].feedSources.push(source)
    }
    console.log(JSON.parse(JSON.stringify(body)))
    this.http.put(label.url, JSON.parse(JSON.stringify(body)),{headers: headers})
      .subscribe(res => {this.getLabels(); console.log('saved')});
  }

  deleteLabel(label: Label){
    let headers = new Headers();
    let token = this.userService.token;
    headers.append('Authorization', 'Bearer '+ token.toString());
    this.http.delete(label.url, {headers: headers})
      .subscribe(res => this.getLabels());
  }

  getLabels(){
    let headers = new Headers();
    let token = this.userService.token
    headers.append('Authorization', 'Bearer '+ token.toString());
    this.http.get('http://localhost:8000/labels/',{headers: headers})
      .subscribe(labels => this.labelSource.next(labels.json().results));
  }

}
