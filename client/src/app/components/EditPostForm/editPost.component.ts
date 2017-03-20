import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Post } from '../Posts/post';

@Component({
  selector: 'edit-form',
  templateUrl: './editPost.component.html',
  styleUrls: ['./editPost.component.scss']
})

export class EditForm {
  newPost = [];

  @Input() status: Boolean;
  @Output() createPost = new EventEmitter();

  formClear() {
    if (this.status) {
      this.newPost = [];
    }
  }

  post() {
    this.createPost.emit(this.newPost)
    this.formClear()
  }
}
