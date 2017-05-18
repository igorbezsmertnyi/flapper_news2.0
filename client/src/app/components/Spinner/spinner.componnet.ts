import { Component, Input } from '@angular/core'

@Component({
  selector: 'spinner',
  templateUrl: './spinner.componnet.html',
  styleUrls: ['./spinner.componnet.scss']
})

export class Spinner {
  @Input() isLoaded: boolean = false
}
