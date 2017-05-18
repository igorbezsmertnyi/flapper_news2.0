import { Component, Output, EventEmitter } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthService } from '../../auth.service'
import { validateEmail } from '../../validators/validators'

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LogIn {
  logInForm: FormGroup

  hasError: boolean = false
  user: any = {}

  @Output() UserData = new EventEmitter()

  constructor(protected authService: AuthService,
              private fb: FormBuilder) {
    this.logInForm = this.fb.group({
      email: new FormControl('', [Validators.required, validateEmail]),
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    })
  }

  logIn(f) {
    this.authService.userLogIn(
      f.control.controls.email.value,
      f.control.controls.password.value
    ).subscribe(
      res => {
        this.UserData.emit(res)
        window.location.hash = ''
        window.location.reload()
      },
      err => {
        this.hasError = true
      }
    )
  }
}
