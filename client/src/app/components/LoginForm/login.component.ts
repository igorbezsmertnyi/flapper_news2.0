import { Component, Output, EventEmitter } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../../auth.service'

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LogIn {
  user: any = {}
  currentLocation: string

  @Output() UserData = new EventEmitter();

  constructor(protected authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.currentLocation = this.router.routerState.snapshot.url
    window.location.href = `${this.currentLocation}#login`
  }

  logIn() {
    this.authService.userLogIn(
      this.user.email,
      this.user.password
    ).subscribe(
      res => {
        this.UserData.emit(res)
        window.location.hash = ''
        window.location.reload()
      },
      err => console.log(err)
    )
  }
}
