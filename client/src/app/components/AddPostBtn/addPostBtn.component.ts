import { Component } from '@angular/core'
import { StateService } from '../../states.service'

@Component({
  selector: 'add-post-button',
  templateUrl: './addPostBtn.component.html',
  styleUrls: ['./addPostBtn.component.scss']
})

export class AddPostBtn {
  isOpen:boolean  = false

  constructor(private st: StateService) {}

  toggleForm() {
    this.st.formIsOpen(this.isOpen = !this.isOpen)
  }
}
