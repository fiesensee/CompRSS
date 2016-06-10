import {Http, Headers} from '@angular/http';
import {UserService} from './user.service';
import {Observable} from 'rxjs/Rx';
import {Injectable} from '@angular/core';

@Injectable()
export class HttpService {
  private rootUrl: string = 'https://comprest.herokuapp.com/';
  private esUrl: string = 'http://fisensee.ddns.net:9200/';
  private token: string = ""
  constructor(private http: Http, private userService: UserService){
    this.userService.token$.subscribe(token => this.token = token.toString());
  }



  private getTokenHeader(): Headers {
    let headers = new Headers();
    headers.set('Authorization', 'Bearer ' + this.token);
    return headers;
  }

  public post(url: string, body, rootUrl=this.rootUrl){
    let headers = this.getTokenHeader();
    headers.set('Content-Type', 'application/json')
    let request = this.http.post(rootUrl + url, body, {headers: headers});
    return request;
  }

  public queryES(url: string, body){
    let headers = new Headers();
    headers.set('Content-Type', 'application/json');
    let request = this.http.post(this.esUrl + url, body, {headers: headers});
    return request;
  }

  public get(url: string){
    let headers = this.getTokenHeader();
    return this.http.get(this.rootUrl + url, {headers: headers});
  }

  public delete(url: string){
    let headers = this.getTokenHeader();
    // uses just the given url, because its already the full and correct one
    return this.http.delete(url, {headers: headers});
  }
}
