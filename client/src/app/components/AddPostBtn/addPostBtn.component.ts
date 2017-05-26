import { Component } from '@angular/core'
import { StateService } from '../../states.service'
import { StoreService } from '../../store.service'

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
              protected sr: StoreService) {
    this.st.formOpen.subscribe(val => this.isOpen = val)
    this.sr.userSession.subscribe(val => {
      this.current_session = val
      Boolean(val.id) ? this.isShow = true : this.isShow = false
    })
  }

  toggleForm() {
    this.st.formIsOpen(this.isOpen = !this.isOpen)
  }
}
