import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class Registration {
  user: any = {}

  constructor(protected authService: AuthService) { }

  registerUser() {
    this.authService.userSignUp(this.user).subscribe(
      res => this.user = {},
      err => console.log(err)
    )
  }
}
