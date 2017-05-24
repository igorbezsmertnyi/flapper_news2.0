import { Component } from '@angular/core'
import { StateService } from '../../states.service'
import { CookieService } from 'angular2-cookie'
import { COOKIE_KEYS } from '../../app.constans'

@Component({
  selector: 'add-post-button',
  templateUrl: './addPostBtn.component.html',
  styleUrls: ['./addPostBtn.component.scss']
})

export class AddPostBtn {
  isOpen:boolean = false
  isShow:boolean = false
  current_session:any

  constructor(private st: StateService,
              protected _cookieService: CookieService) {
    this.st.formOpen.subscribe(val => this.isOpen = val)
    this.current_session = this._cookieService.getObject(COOKIE_KEYS.SEESION_HASH)
  }

  ngOnInit() {
    if (this.current_session) {
      this.isShow = true
    }
  }

  toggleForm() {
    this.st.formIsOpen(this.isOpen = !this.isOpen)
  }
}
