import {Component, Injectable} from '@angular/core';
import {UserService} from '../services/user.service';
import {NgClass} from '@angular/common';
import {User} from '../models/user';
import {Router} from '@angular/router';

@Component({
  selector: 'landing',
  templateUrl: './app/landing.html',
  directives: [NgClass]
})
@Injectable()
export class UserComponent {
  public register: boolean = false;
  public authFailure: boolean = false;
  public user: User = new User();
  public newUser: User = new User();
  constructor(private userService: UserService, private router: Router){
  }

  public login() {
    let request = this.userService.loginUser(this.user)
    request.subscribe(res => {
      console.log(res.status);
        this.authFailure = false;
        this.router.navigateByUrl('/reader')
    }, err => {
      console.log(err.status);
      this.authFailure = true;
    });
  }

  registerNewUser() {

  }
}
