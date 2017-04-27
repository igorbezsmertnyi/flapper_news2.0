import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class Registration {
  user: any = {}
  flash_massage: string

  constructor(private authService: AuthService) { }

  registerUser() {
    this.authService.userSignUp(this.user).subscribe(
      res =>  {
        if (!res.errors) {
          this.user = {}
          console.log(res)
        } else {
          this.flash_massage = res.errors
          console.log(this.flash_massage)
        }
      },
      err =>  console.log(err)
    )
  }
}
