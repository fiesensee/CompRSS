import {Http, Headers} from '@angular/http';
import {Subject} from 'rxjs/Subject';
import {Injectable} from '@angular/core';

@Injectable()
export class UserService {
  public token = 'undefined';
  private username: string = 'felix';
  private password: string = 'sinisterkid';
  private client_id: string = 'QuYtbEXqZnu3CkJOoRslncI5y1t4O2woFfWs4lsf';
  private client_secret: string = 'Y6zJ3KY420bmITiq6ZOmGa4axSnEliUYSQFaa1IIK6tAtM4JxRhl9wcBTZSix9fK10qrckHFH7ztimCOm2TwVhF6ItwYBXaaRnsk4bdAM13zEouopPHkERM4Kegy5b5w';
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


  private setToken(token){
    this.token = token.access_token;
  }
}
