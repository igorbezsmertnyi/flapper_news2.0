import { Component, Output, EventEmitter, HostListener } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { LOCAL_STORAGE_KEYS } from '../../../app.constans'
import { LocalStorage } from '../../../localStorage.service'

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

  @Output() firstStepData = new EventEmitter()

  constructor(private fb: FormBuilder,
              protected localStorage: LocalStorage) {
    this.firstStep = this.fb.group({
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      categories: ['', Validators.required]
    })
  }

  ngOnInit() {
    if (this.localStorage.getData(LOCAL_STORAGE_KEYS.POST_CREATING.FIRST_STEP)) {
      let first_step = this.localStorage.getData(LOCAL_STORAGE_KEYS.POST_CREATING.FIRST_STEP)

      this.firstStep.setValue({
        title: first_step.data.title,
        subtitle: first_step.data.subtitle,
        categories: first_step.data.categories
      })

      this.firstStepData.emit(this.firstStep.value)
    }
  }

  @HostListener('keyup', ['$event']) emitForm(e) {
    if (this.firstStep.valid) {
      this.localStorage.setData(this.firstStep.value, LOCAL_STORAGE_KEYS.POST_CREATING.FIRST_STEP)
      this.firstStepData.emit(this.firstStep.value)
    } else {
      this.firstStepData.emit(false)
    }
  }
}
