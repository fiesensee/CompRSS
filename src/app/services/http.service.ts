import {Http, Headers} from '@angular/http';
import {UserService} from './user.service';
import {Observable} from 'rxjs/Rx';
import {Injectable} from '@angular/core';

@Injectable()
export class HttpService {
  private headers = new Headers();
  private rootUrl: string = 'https://comprest.herokuapp.com/';
  constructor(private http: Http, private userService: UserService){
    this.userService.token$.subscribe(token => this.setTokenHeaders(token));
    this.headers.set('Content-Type', 'application/json');
  }

  private setTokenHeaders(token: string){
    this.headers.set('Authorization', 'Bearer ' + token.toString());
  }

  public post(url: string, body){
    console.log('saving: ' + body);
    let request = this.http.post(this.rootUrl + url, body, {headers: this.headers});
    // request.subscribe(res => this.headers.delete('Content-Type'));
    return request;
  }

  public get(url: string){
    return this.http.get(this.rootUrl + url, {headers: this.headers});
  }

  public delete(url: string){
    // uses just the given url, because its already the full and correct one
    return this.http.delete(url, {headers: this.headers});
  }
}
