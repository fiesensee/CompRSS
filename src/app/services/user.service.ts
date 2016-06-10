import {Http, Headers} from '@angular/http';
import {Subject} from 'rxjs/Subject';
import {Injectable} from '@angular/core';
import {User} from '../models/user';

@Injectable()
export class UserService {
  public token = 'undefined';
  public tokenSource = new Subject<string>();
  public token$ = this.tokenSource.asObservable();
  private user: User;
  private username: string = 'felix';
  private password: string = 'sinisterkid10';
  private client_id: string = 'nNRd7e60nzUNlzlpM0wgw3Bvq0ck9TkNN43was44';
  private client_secret: string = 'qqIIPLKgdzez8nCYUXkM9847GijrQmFzHQMinJ80KINMukHwQhhG8QzhPWmttTAwuEZ58V0qpWSoSVaOXMQyPsM74Xk4MlruqyAtGbmsQtmsMmNFatlJHuWiRuqZdjNI';
  constructor(private http: Http) {}

  getToken(){
    let request = this.authenticate().subscribe(res => this.setToken(res.json()))
  }

  private authenticate() {
    let body = [
      'grant_type=password',
      'username=' + this.user.username,
      'password=' + this.user.password,
      'client_id=' + this.client_id,
      'client_secret=' + this.client_secret
    ]
    let headers = new Headers()
    headers.append('Content-Type', 'application/x-www-form-urlencoded')
    let request =  this.http.post('https://comprest.herokuapp.com/o/token/', body.join('&'), {headers: headers})
    return request;
  }


  private setToken(token){
    this.tokenSource.next(token.access_token);
    this.token = token.access_token;
  }

  public loginUser(user: User) {
    this.user = user;
    return this.authenticate()
  }
}
