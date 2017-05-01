import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { CookieService } from 'angular2-cookie/core';
import { COOKIE_KEYS } from '../../app.constans';

@Component({
  selector: 'app-menu',
  templateUrl: './appmenu.component.html',
  styleUrls: ['./appmenu.component.scss']
})

export class AppMenu {
  loginShow: boolean = false
  UserData = {}

  constructor(private authService: AuthService,
              private _cookieService: CookieService) { }

  ngOnInit() {
    let session_hash = this._cookieService.getObject(COOKIE_KEYS.SEESION_HASH)
    if (session_hash) {
      this.authService.validateToken(session_hash).subscribe(
        res => this.UserData = res.user,
        err => this._cookieService.remove(COOKIE_KEYS.SEESION_HASH)
      )
    }
  }

  getCurrentUser(session) {
    this.UserData = session.user
    this.setCookie(COOKIE_KEYS.SEESION_HASH, session)
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
      }
    )
  }

  setCookie(key: string, value: Object) {
    return this._cookieService.putObject(key, value)
  }
}
