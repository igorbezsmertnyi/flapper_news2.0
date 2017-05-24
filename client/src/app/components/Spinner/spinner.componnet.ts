import { Component } from '@angular/core'
import { StateService } from '../../states.service'

@Component({
  selector: 'spinner',
  templateUrl: './spinner.componnet.html',
  styleUrls: ['./spinner.componnet.scss']
})

export class Spinner {
  isOpen:boolean = false
  isSuccess:boolean = false
  isError:boolean = false

  constructor(private st: StateService) {
    this.st.spinnerOpen.subscribe(val => {
      this.isOpen = val.isOpen
      if (val.status !== undefined) {
        val.status ? this.isSuccess = true : this.isError = true
        this.timeOutClosing()
      }
    })
  }

  timeOutClosing() {
    setTimeout(() => {
      this.isOpen = false
      this.isSuccess = false
      this.isError = false
    }, 1500)
  }
}
