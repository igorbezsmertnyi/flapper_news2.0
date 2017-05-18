import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'header-steps',
  templateUrl: './headerStaps.component.html',
  styleUrls: ['./headerStaps.component.scss']
})

export class HeaderStaps {
  @Input() options: Object
  @Output() goToStep = new EventEmitter()

  sendStep(step) {
    this.goToStep.emit(step)
  }
}
