import { Component, EventEmitter, Output, Input } from '@angular/core'
import { EDITOR_OPTIONS } from '../../../app.constans'
import { PostService } from '../../Posts/post.service'
import { StoreService } from '../../../store.service'
import { StateService } from '../../../states.service'

@Component({
  selector: 'third-step-creating',
  templateUrl: './thirdStep.component.html',
  styleUrls: ['./thirdStep.component.scss']
})

export class ThirdStep {
  content: any
  @Input() status:boolean = false
  @Input() fullscreen: boolean = false
  @Output() thirdStepData = new EventEmitter()

  constructor(private postService: PostService,
              protected sr: StoreService,
              protected st: StateService) {}

  public options: Object = {
    placeholderText: 'Enter Your Content Here!',
    charCounterCount: false,
    imageUploadURL: EDITOR_OPTIONS.imageUploadURL,
    iframe: false,
    toolbarButtons: EDITOR_OPTIONS.toolbarBottom,
    htmlAllowedStyleProps: EDITOR_OPTIONS.htmlAllowedStyleProps,
    events: {
      'froalaEditor.contentChanged': (e, editor) => {
        this.content = editor.html.get()
        this.sr.setThirdStepData(this.content)
      },
      'froalaEditor.initialized': (e, editor) => {
        this.sr.thirdStep.subscribe(val => {
          console.log(val)
          if (val) {
            editor.html.set(val)
          } else {
            editor.html.set('')
          }
        })

        this.st.postStatus.subscribe(val => {
          val ? editor.html.set('') : null
        })
      },
      'froalaEditor.image.inserted': (e, editor, $img, response) => {
        $img[0].setAttribute('data-id', JSON.parse(response).id)
      },
      'froalaEditor.image.beforeRemove': (e, editor, $img) => {
        let id = $img[0].dataset.id
        this.postService.deleteContentImage(id)
      }
    },
    methods: {
      'html.get': true
    }
  }
}
