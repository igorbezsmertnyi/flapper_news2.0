import { Component, EventEmitter, Output, Input } from '@angular/core'
import { EDITOR_OPTIONS } from '../../../app.constans'
import { LOCAL_STORAGE_KEYS } from '../../../app.constans'
import { LocalStorage } from '../../../localStorage.service'

@Component({
  selector: 'third-step-creating',
  templateUrl: './thirdStep.component.html',
  styleUrls: ['./thirdStep.component.scss']
})

export class ThirdStep {
  content: any
  @Input() fullscreen: boolean = false
  @Output() thirdStepData = new EventEmitter()

  constructor(protected localStorage: LocalStorage) {}

  public options: Object = {
    placeholderText: 'Enter Your Content Here!',
    charCounterCount: false,
    iframe: false,
    toolbarButtons: EDITOR_OPTIONS.toolbarBottom,
    htmlAllowedStyleProps: EDITOR_OPTIONS.htmlAllowedStyleProps,
    events: {
      'froalaEditor.contentChanged': (e, editor) => {
        this.content = editor.html.get()
        this.thirdStepData.emit({content: this.content})
        this.localStorage.setData({content: this.content}, LOCAL_STORAGE_KEYS.POST_CREATING.THIRD_STEP)
      },
      'froalaEditor.initialized': (e, editor) => {
        if (this.localStorage.getData(LOCAL_STORAGE_KEYS.POST_CREATING.THIRD_STEP)) {
          this.thirdStepData.emit({content: this.localStorage.getData(LOCAL_STORAGE_KEYS.POST_CREATING.THIRD_STEP).data.content})
          editor.html.set(this.localStorage.getData(LOCAL_STORAGE_KEYS.POST_CREATING.THIRD_STEP).data.content)
        }
      }
    },
    methods: {
      'html.get': true
    }
  }
}
