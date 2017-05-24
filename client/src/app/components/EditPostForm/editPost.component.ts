import { Component, Input, Output, EventEmitter } from '@angular/core'
import { LOCAL_STORAGE_KEYS } from '../../app.constans'
import { LocalStorage } from '../../localStorage.service'
import { StateService } from '../../states.service'
import { Post } from '../Posts/post'

@Component({
  selector: 'edit-form',
  templateUrl: './editPost.component.html',
  styleUrls: ['./editPost.component.scss']
})

export class EditForm {
   public first_step_local:any = {}
   public second_step_local:any = {}
   public third_step_local:any = {}

  newPost: any = {
    title: '',
    subtitle: '',
    category: '',
    cover: {},
    content: ''
  }

  action: string = 'next'
  isValid: boolean = false
  firstStepIsValid: boolean = false
  secondStepIsValid: boolean = false
  thirdStepIsValid: boolean = false

  firstStep: any
  secondStep: any
  thirdStep: any

  public formOptions: Object = {
    placeholderText: 'Edit Your Content Here!',
    charCounterCount: false
  }

  headerOptions: any = {
    firstStep: true,
    secondStep: false,
    thirdStep: false
  }

  isOpen: boolean = false
  isShow: boolean = false
  fullEditor: boolean = false

  @Input() status: boolean
  @Input() postInputData: Object
  @Output() Post = new EventEmitter()

  constructor(protected localStorage: LocalStorage,
              private st: StateService) {
    this.st.formOpen.subscribe(val => {
      this.isShow = !this.isShow
      this.isOpen = !this.isOpen
    })
  }

  ngOnChanges() {
    this.clearForm()
  }

  stepsControl() {
    if (this.isValid) {
      if (this.headerOptions.firstStep) {
        this.goToSecondStep()
      }
      else if (this.headerOptions.secondStep) {
        this.goToThirdStep()
      }
      else if (this.headerOptions.thirdStep) {
        if (this.firstStepIsValid
              && this.secondStepIsValid
                && this.thirdStepIsValid)
                  this.emitPost()
      }
    }
  }

  firstStepData(firstStepData) {
    if (firstStepData) {
      this.isValid = true
      this.firstStepIsValid = true
    } else {
      this.isValid = false
      this.firstStepIsValid = false
    }
    this.firstStep = firstStepData
  }

  secondStepData(secondStepData) {
    if (secondStepData) {
      this.isValid = true
      this.secondStepIsValid = true
    } else {
      this.isValid = false
      this.secondStepIsValid = false
    }
    this.secondStep = secondStepData
  }

  thirdStepData(thirdStepData) {
    if (thirdStepData) {
      this.isValid = true
      this.thirdStepIsValid = true
    } else {
      this.isValid = false
      this.thirdStepIsValid = false
    }
    this.thirdStep = thirdStepData
  }

  goToFirstStep() {
    this.firstStepIsValid ? this.isValid = true : this.isValid = false
    this.action = 'next'
    this.headerOptions.firstStep = true
    this.headerOptions.secondStep = false
    this.headerOptions.thirdStep = false
  }

  goToSecondStep() {
    this.secondStepIsValid ? this.isValid = true : this.isValid = false
    this.action = 'next'
    this.headerOptions.firstStep = false
    this.headerOptions.secondStep = true
    this.headerOptions.thirdStep = false
  }

  goToThirdStep() {
    this.thirdStepIsValid ? this.isValid = true : this.isValid = false
    this.action = 'create'
    this.headerOptions.firstStep = false
    this.headerOptions.secondStep = false
    this.headerOptions.thirdStep = true
  }

  goToStep(step) {
    switch(step) {
      case 1:
        this.goToFirstStep()
        break
      case 2:
        this.goToSecondStep()
        break
      case 3:
        this.goToThirdStep()
        break
    }
  }

  clearForm() {
    if (this.status) {
      this.st.formIsOpen(false)
      this.localStorage.removeData(LOCAL_STORAGE_KEYS.POST_CREATING.FIRST_STEP)
      this.localStorage.removeData(LOCAL_STORAGE_KEYS.POST_CREATING.SECOND_STEP)
      this.localStorage.removeData(LOCAL_STORAGE_KEYS.POST_CREATING.THIRD_STEP)
      this.newPost = []
    }
  }

  setFullEditor() {
    this.fullEditor = !this.fullEditor
  }

  formInit(data) {
    this.isOpen = !this.isOpen
    this.isShow = !this.isShow
    document.body.classList.toggle('fixed')
    setTimeout(() => {
      this.isShow = true
    }, 200)
    // if (data.action === 'create') {
    //   this.newPost = {}
    // } else {
    //   this.newPost = {
    //     id: data.postInput.id,
    //     title: data.postInput.title,
    //     description: data.postInput.content,
    //     index: data.index
    //   }
    // }
  }

  emitPost() {
    this.newPost = {
      title: this.firstStep.title,
      subtitle: this.firstStep.subtitle,
      categories: this.firstStep.categories,
      cover: {
        color: this.secondStep.overlay.color,
        opacity: this.secondStep.overlay.opacity,
        blur: this.secondStep.overlay.blur,
        gray: this.secondStep.overlay.gray
      },
      image: {
        file: this.secondStep.file,
        source: this.secondStep.source
      },
      content: this.thirdStep.content
    }
    this.Post.emit(this.newPost)
  }
}
