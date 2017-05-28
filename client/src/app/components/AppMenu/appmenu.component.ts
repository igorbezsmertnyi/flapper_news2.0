import { Component, HostListener } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../../auth.service'
import { CookieService } from 'angular2-cookie/core'
import { COOKIE_KEYS } from '../../app.constans'
import { StoreService } from '../../store.service'

@Component({
  selector: 'app-menu',
  templateUrl: './appmenu.component.html',
  styleUrls: ['./appmenu.component.scss']
})

export class AppMenu {
  loginShow: boolean = false
  UserData:any = {}

  constructor(protected authService: AuthService,
              protected _cookieService: CookieService,
              private router: Router,
              protected sr: StoreService) { }

  @HostListener('click', ['$event']) onClick(e) {
    if (this.loginShow && e.target.className === 'login-form__background') {
      this.loginShow = false
    }
  }

  ngOnInit() {
    let session_hash = this._cookieService.getObject(COOKIE_KEYS.SEESION_HASH)
    if (session_hash) {
      this.authService.validateToken(session_hash).subscribe(
        res => {
          this.UserData = res.user
          this.sr.setCurrentSession(res.user)
        },
        err => this._cookieService.remove(COOKIE_KEYS.SEESION_HASH)
      )
    }
  }

  getCurrentUser(session) {
    this.UserData = session.user
    this.setCookie(COOKIE_KEYS.SEESION_HASH, session)
    this.sr.setCurrentSession(session)
    this.loginShowClick()
  }

  loginShowClick() {
    this.loginShow = !this.loginShow
  }

  logOut() {
    this.authService.userLogOut().subscribe(
      res => {
        this._cookieService.remove(COOKIE_KEYS.SEESION_HASH)
        this.UserData = {}
        window.location.hash = ''
        this.sr.setCurrentSession({})
      }
    )
  }

  setCookie(key: string, value: Object) {
    return this._cookieService.putObject(key, value)
  }
}
