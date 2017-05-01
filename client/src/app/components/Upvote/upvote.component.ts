import { Component, Output, Input, EventEmitter, Renderer, ElementRef, ViewChild } from '@angular/core'
import { CookieService } from 'angular2-cookie/core'
import { COOKIE_KEYS } from '../../app.constans'


@Component({
  selector: 'upvote',
  templateUrl: './upvote.component.html',
  styleUrls: ['./upvote.component.scss']
})

export class Upvote {
  @ViewChild('up') up:ElementRef;
  @ViewChild('dis') dis:ElementRef;

  current_session: any
  isUpvoted: boolean = false
  isDisupvoted: boolean = false

  @Input() index: number
  @Input() item: any
  @Output() upvote = new EventEmitter()

  constructor(private _cookieService: CookieService,
              private renderer: Renderer,
              private elementRef: ElementRef) {
    this.current_session = this._cookieService.getObject(COOKIE_KEYS.SEESION_HASH)
  }

  ngOnInit() {
    this.isUpvote()
    this.isDisupvote()
  }

  clickUpvote() {
    this.isUpvoted = !this.isUpvoted
    if(this.isUpvoted) {
      this.renderer.setElementClass(this.up.nativeElement, 'up-btn--active', true)
    } else {
      this.renderer.setElementClass(this.up.nativeElement, 'up-btn--active', false)
    }
  }

  clickDisupvote() {
    this.isDisupvoted = !this.isDisupvoted
    if (this.isDisupvoted) {
      this.renderer.setElementClass(this.dis.nativeElement, 'dis-btn--active', true)
    } else {
      this.renderer.setElementClass(this.dis.nativeElement, 'dis-btn--active', false)
    }
  }

  upvoteController(action) {
    let obj = { index: this.index,
                post: this.item,
                action: action }

    if (action) {
      if (!this.isUpvoted && !this.isDisupvoted) {
        this.clickUpvote()
        this.upvote.emit(obj)
      } else if (!this.isUpvoted && this.isDisupvoted) {
        this.clickUpvote()
        this.clickDisupvote()
        this.upvote.emit(obj)
      } else if (this.isUpvoted) {
        this.clickUpvote()
        this.upvote.emit(obj)
      }
    } else {
      if (!this.isDisupvoted && !this.isUpvoted) {
        this.clickDisupvote()
        this.upvote.emit(obj)
      } else if (!this.isDisupvoted && this.isUpvoted) {
        this.clickDisupvote()
        this.clickUpvote()
        this.upvote.emit(obj)
      } else if (this.isDisupvoted) {
        this.clickDisupvote()
        this.upvote.emit(obj)
      }
    }
  }

  isUpvote() {
    this.item.upvotes.map(upvote => {
      if(upvote.user_id === this.current_session.user.id) {
        this.renderer.setElementClass(this.up.nativeElement, 'up-btn--active', true)
        this.isUpvoted = true
      }
    })
  }

  isDisupvote() {
    this.item.disupvotes.map(disupvote => {
      if(disupvote.user_id === this.current_session.user.id) {
        this.renderer.setElementClass(this.dis.nativeElement, 'dis-btn--active', true)
        this.isDisupvoted = true
      }
    })
  }
}
