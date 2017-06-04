import { Component, Output, EventEmitter, Input, HostListener } from '@angular/core'
import { MdSliderModule } from '@angular/material'
import { StateService } from '../../../states.service'
import { StoreService } from '../../../store.service'

@Component({
  selector: 'second-step-creating',
  templateUrl: './secondStep.component.html',
  styleUrls: ['./secondStep.component.scss']
})

export class SecondStep {
  @Input() status:boolean = false
  @Output() secondStepData = new EventEmitter()

  isDragenter: boolean = false
  startUpload: boolean = false
  imageDidChange: boolean = false

  supportedFileTypes: string[] = ['image/png', 'image/jpeg', 'image/gif']

  imageShow: boolean = false
  currentImage: string = ''
  imageData: any = {}

  overlayValue: number = 0
  color: string = '#fff'
  blurValue: number = 0
  grayValue: number = 0

  second_step: any

  constructor(private st: StateService,
              protected sr: StoreService) {
    this.sr.secondStep.subscribe(val => {
      if (val) {
        this.imageShow = true
        this.currentImage = val.source
        this.overlayValue = val.overlay.opacity
        this.color = val.overlay.color
        this.blurValue = val.overlay.blur
        this.grayValue = val.overlay.gray
      }
    })

    this.st.postStatus.subscribe(val => {
      val ? this.removePicture() : null
    })
  }

  onDragStart(e) {
    e.preventDefault()
    this.isDragenter = true
  }

  onDragLeave(e) {
    e.preventDefault()
    this.isDragenter = false
  }

  onDrop(e) {
    e.preventDefault()
    this.imageData = e.dataTransfer.files
    this.st.spinnrIsOpen(true)
    this.imageLoader()
  }

  getOverlayValue(e) {
    this.overlayValue = e.value.toFixed(2)
    this.sr.setSecondStepData(this.emitSecondStep())
  }

  getOverlayColor(c) {
    this.color = c
    this.sr.setSecondStepData(this.emitSecondStep())
  }

  getBlurValue(b) {
    this.blurValue = b.value
    this.sr.setSecondStepData(this.emitSecondStep())
  }

  getGrayValue(g) {
    this.grayValue = g.value.toFixed(2)
    this.sr.setSecondStepData(this.emitSecondStep())
  }

  removePicture() {
    this.currentImage = ''
    this.sr.setSecondStepData(false)
    this.imageShow = false
    this.isDragenter = false
    this.overlayValue = 0
    this.blurValue = 0
    this.grayValue = 0
    this.color = '#fff'
  }

  emitSecondStep() {
    if (this.imageData.length) {
      return {
        file: {
          lastModified: this.imageData[0].lastModified,
          name: this.imageData[0].name,
          size: this.imageData[0].size,
          type: this.imageData[0].type,
          webkitRelativePath: this.imageData[0].webkitRelativePath
        },
        source: this.currentImage,
        overlay: {
          color: this.color,
          opacity: this.overlayValue,
          blur: this.blurValue,
          gray: this.grayValue
        }
      }
    } else {
      return {
        file: {
          lastModified: this.second_step.data.file.lastModified,
          name: this.second_step.data.file.name,
          size: this.second_step.data.file.size,
          type: this.second_step.data.file.type,
          webkitRelativePath: this.second_step.data.file.webkitRelativePath
        },
        source: this.currentImage,
        overlay: {
          color: this.color,
          opacity: this.overlayValue,
          blur: this.blurValue,
          gray: this.grayValue
        }
      }
    }
  }

  private imageLoader() {
    if (this.imageData.length) {
      if (this.imageData[0].size < 1200000) {
        this.supportedFileTypes.map(type => {
          if (this.imageData[0].type === type) {
            let fileReader = new FileReader()
            fileReader.onload = () => {
              this.currentImage = fileReader.result
              this.imageShow = true
              this.st.spinnrIsOpen(false)
              if (fileReader.result) {
                this.sr.setSecondStepData(this.emitSecondStep())
              }
            }
            fileReader.readAsDataURL(this.imageData[0])
          } else {
            this.isDragenter = false
            this.imageShow = false
          }
        })
      } else {
        this.isDragenter = false
        this.imageShow = false
        this.st.spinnrIsOpen(false)
      }
    }
  }
}
