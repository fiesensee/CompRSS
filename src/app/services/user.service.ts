import {Http, Headers} from '@angular/http';
import {Subject} from 'rxjs/Subject';
import {Injectable} from '@angular/core';
import {User} from '../models/user';

@Injectable()
export class UserService {
  public token = 'undefined';
  public tokenSource = new Subject<string>();
  public token$ = this.tokenSource.asObservable();
  private user: User = null;
  private restUrl: string = 'https://comprest.herokuapp.com/';
  private superUser = new User();
  private client_id: string = 'nNRd7e60nzUNlzlpM0wgw3Bvq0ck9TkNN43was44';
  private client_secret: string = 'qqIIPLKgdzez8nCYUXkM9847GijrQmFzHQMinJ80KINMukHwQhhG8QzhPWmttTAwuEZ58V0qpWSoSVaOXMQyPsM74Xk4MlruqyAtGbmsQtmsMmNFatlJHuWiRuqZdjNI';
  constructor(private http: Http) {
    this.superUser.username = 'felix';
    this.superUser.password = 'sinisterkid10';
  }

  public getToken(){
    console.log('getting token');
    this.authenticate(this.user).subscribe(res => this.setToken(res.json().access_token))
  }

  public getSuperUserToken() {
    let request = this.authenticate(this.superUser)
    return request;
  }

  private setToken(token){
    this.tokenSource.next(token);
    this.token = token;
  }

  private authenticate(user: User) {
    let body = [
      'grant_type=password',
      'username=' + user.username,
      'password=' + user.password,
      'client_id=' + this.client_id,
      'client_secret=' + this.client_secret
    ]
    let headers = new Headers()
    headers.append('Content-Type', 'application/x-www-form-urlencoded')
    let request =  this.http.post(this.restUrl + 'o/token/', body.join('&'), {headers: headers})
    return request;
  }


  public loginUser(user: User) {
    console.log('loggin in');
    this.user = user;
    return this.authenticate(user)
  }

  public getUser(): User {
    return this.user;
  }

  public isAuthenticated(user: User): boolean {
    let emptyUser = new User();
    if(this.user === emptyUser) {
      return false;
    }
  }

  public logoutUser() {
    this.user = null;
  }

  public registerUser(user: User, token: string) {
    let request;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', 'Bearer ' + token)
    request = this.http.post(this.restUrl + 'users/', JSON.stringify(user), {headers: headers})
    return request;
  }
}
