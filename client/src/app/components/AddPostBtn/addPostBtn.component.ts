import { Component } from '@angular/core'
import { StateService } from '../../states.service'
import { StoreService } from '../../store.service'
import { INITIAL_STATES } from '../../app.constans'

@Component({
  selector: 'add-post-button',
  templateUrl: './addPostBtn.component.html',
  styleUrls: ['./addPostBtn.component.scss']
})

export class AddPostBtn {
  isOpen:boolean = false
  isShow:boolean = false
  isEdit:boolean = false
  current_session:any

  constructor(private st: StateService,
              protected sr: StoreService) {
    this.st.formOpen.subscribe(val => this.isOpen = val)
    this.sr.userSession.subscribe(val => {
      this.current_session = val
      Boolean(val.id) ? this.isShow = true : this.isShow = false
    })

    this.st.postUpdate.subscribe(val => {
      this.isEdit = val
    })
  }

  toggleForm() {
    this.st.formIsOpen(this.isOpen = !this.isOpen)
    if (this.isEdit) {
      this.sr.setFistStepData(INITIAL_STATES.POST.FIRST_STEP)
      this.sr.setSecondStepData(INITIAL_STATES.POST.SECOND_STEP)
      this.sr.setThirdStepData(INITIAL_STATES.POST.THIRD_STEP)
      this.st.postIsUpdate(false)
    }
  }
}
