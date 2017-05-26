import { Injectable } from '@angular/core'
import { Http, RequestOptions, Headers, Response } from '@angular/http'
import { CookieService } from 'angular2-cookie/core'
import { REQUEST_HEADER, API, COOKIE_KEYS } from './app.constans'
import 'rxjs/add/operator/map'

@Injectable()
export class AuthService {
  headers: any
  current_session: any

  constructor(private http: Http,
              private _cookieService: CookieService) {
    this.headers = new Headers(REQUEST_HEADER);
    this.headers = new RequestOptions({ headers: this.headers })
    this.current_session = this._cookieService.getObject(COOKIE_KEYS.SEESION_HASH)
  }

  validateToken(session_hash) {
    let body = JSON.stringify({token: session_hash.token})
    return this.http.post(API.V1.VALIDATE_TOKEN, body, this.headers)
               .map((res: Response) => res.json())
  }

  userSignUp(user) {
    let body = JSON.stringify({first_name: user.first_name,
                               last_name: user.last_name,
                               email: user.email,
                               password: user.password});
    return this.http.post(API.V1.REGISTRATION_INDEX, body, this.headers)
               .map((res: Response) => res.json())
  }

  userLogIn(email, password) {
    let body = JSON.stringify({email: email,
                               password: password});
    return this.http.post(API.V1.SESSIONS, body, this.headers)
               .map((res: Response) => {
                 this.current_session = res.json()
                 return res.json()
               })
  }

  userLogOut() {
    return this.http.delete(`${API.V1.SESSIONS}/${this.current_session.id}`, this.headers)
               .map(res => res.json())
  }
}
