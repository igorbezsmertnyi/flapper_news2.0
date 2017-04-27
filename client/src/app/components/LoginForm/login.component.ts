import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LogIn {
  user: any = {}

  @Output() UserData = new EventEmitter();

  constructor(private authService: AuthService) { }

  logIn() {
    this.authService.userLogIn(
      this.user.email,
      this.user.password
    ).subscribe(
      res => this.UserData.emit(res),
      err => console.log(err)
    )
  }
}
