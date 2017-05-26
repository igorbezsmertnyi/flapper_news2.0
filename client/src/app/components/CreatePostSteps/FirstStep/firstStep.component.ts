import { Component, Output, EventEmitter, Input, HostListener } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { StoreService } from '../../../store.service'
import { StateService } from '../../../states.service'

@Component({
  selector: 'firsr-step-creating',
  templateUrl: './firstStep.component.html',
  styleUrls: ['./firstStep.component.scss']
})

export class FirstStep {
  firstStep: FormGroup
  post: any = {}

  categories: object = [
    { value: 'option 1' },
    { value: 'option 2' },
    { value: 'option 3' },
  ]

  @Input() status:boolean = false
  @Output() firstStepData = new EventEmitter()

  constructor(private fb: FormBuilder,
              protected sr: StoreService,
              protected st: StateService) {
    this.sr.firstStep.subscribe(val => {
      if (val) {
        this.firstStep.setValue({
          title: val.title,
          subtitle: val.subtitle,
          categories: val.categories
        })
      }
    })

    this.st.postStatus.subscribe(val => {
      if (val) {
        this.firstStep.setValue({
          title: '',
          subtitle: '',
          categories: ''
        })
      }
    })

    this.firstStep = this.fb.group({
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      categories: ['', Validators.required]
    })
  }

  @HostListener('keyup', ['$event']) emitForm(e) {
    if (this.firstStep.valid) {
      this.sr.setFistStepData(this.firstStep.value)
    } else {
      this.sr.setFistStepData(false)
    }
  }
}
