import { Component, Output, EventEmitter, HostListener } from '@angular/core'
import { MdSliderModule } from '@angular/material'
import { LOCAL_STORAGE_KEYS } from '../../../app.constans'
import { LocalStorage } from '../../../localStorage.service'

@Component({
  selector: 'second-step-creating',
  templateUrl: './secondStep.component.html',
  styleUrls: ['./secondStep.component.scss']
})

export class SecondStep {
  @Output() secondStepData = new EventEmitter()

  isDragenter: boolean = false
  startUpload: boolean = false

  supportedFileTypes: string[] = ['image/png', 'image/jpeg', 'image/gif']

  imageShow: boolean = false
  currentImage: string = ''
  imageData: any = {}

  overlayValue: number = 0
  color: string = '#fff'
  blurValue: number = 0
  grayValue: number = 0

  second_step: any

  constructor(protected localStorage: LocalStorage) {}

  ngOnInit() {
    if (this.localStorage.getData(LOCAL_STORAGE_KEYS.POST_CREATING.SECOND_STEP)) {
      this.second_step = this.localStorage.getData(LOCAL_STORAGE_KEYS.POST_CREATING.SECOND_STEP)
      this.imageShow = true
      this.currentImage = this.second_step.data.source
      this.overlayValue = this.second_step.data.overlay.opacity
      this.color = this.second_step.data.overlay.color
      this.blurValue = this.second_step.data.overlay.blur
      this.grayValue = this.second_step.data.overlay.gray

      this.secondStepData.emit(this.second_step.data)
    }
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
    this.imageLoader()
  }

  getOverlayValue(e) {
    this.overlayValue = e.value.toFixed(2)
    this.secondStepData.emit(this.emitSecondStep())
    this.localStorage.setData(this.emitSecondStep(), LOCAL_STORAGE_KEYS.POST_CREATING.SECOND_STEP)
  }

  getOverlayColor(c) {
    this.color = c
    this.secondStepData.emit(this.emitSecondStep())
    this.localStorage.setData(this.emitSecondStep(), LOCAL_STORAGE_KEYS.POST_CREATING.SECOND_STEP)
  }

  getBlurValue(b) {
    this.blurValue = b.value
    this.secondStepData.emit(this.emitSecondStep())
    this.localStorage.setData(this.emitSecondStep(), LOCAL_STORAGE_KEYS.POST_CREATING.SECOND_STEP)
  }

  getGrayValue(g) {
    this.grayValue = g.value.toFixed(2)
    this.secondStepData.emit(this.emitSecondStep())
    this.localStorage.setData(this.emitSecondStep(), LOCAL_STORAGE_KEYS.POST_CREATING.SECOND_STEP)
  }

  removePicture() {
    this.currentImage = ''
    this.secondStepData.emit()
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
      this.supportedFileTypes.map(type => {
        if (this.imageData[0].type === type) {
          let fileReader = new FileReader()
          fileReader.onload = () => {
            this.currentImage = fileReader.result
            this.imageShow = true
            this.startUpload = false
            if (fileReader.result) {
              this.secondStepData.emit(this.emitSecondStep())
              this.localStorage.setData(this.emitSecondStep(), LOCAL_STORAGE_KEYS.POST_CREATING.SECOND_STEP)
            }
          }
          fileReader.readAsDataURL(this.imageData[0])
        } else {
          this.isDragenter = false
          this.imageShow = false
          console.log("type isn't supported")
        }
      })
    }
  }
}
