import {Http, Headers} from '@angular/http';
import {Subject} from 'rxjs/Subject';
import {Injectable} from '@angular/core';

@Injectable()
export class UserService {
  testToken = '';
  tokenSource = new Subject<string>();
  token$ = this.tokenSource.asObservable();
  username: string = 'felix';
  password: string = 'sinisterkid';
  client_id: string = 'FmpYthS5vsyLtrmgJB2N2ySJpTjKnL7debXPlSow';
  client_secret: string = 'pTpeLGCIvd3Lki1NFiUgLhWFfYpasJXBi2vGVv3OUTNv6xGLSjR3Lpb00Pj4KCdiXyzedZr37otfzqiCIuhWTwmHGB0JFGNlMqLyY6BbZq4UN1q0dA9ZKKgWqsLuTcCB';
  constructor(private http: Http) {}

  getToken(){
    let body = [
      'grant_type=password',
      'username=' + this.username,
      'password=' + this.password,
      'client_id=' + this.client_id,
      'client_secret=' + this.client_secret
    ]
    let headers = new Headers()
    headers.append('Content-Type', 'application/x-www-form-urlencoded')
    this.http.post('http://localhost:8000/o/token/', body.join('&'), {headers: headers})
      .subscribe(res => this.setToken(res.json()))
  }


  setToken(token){
    // console.log(token.access_token)
    this.tokenSource.next(token.access_token);
  }
}
