import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Post } from '../Posts/post';

@Component({
  selector: 'edit-form',
  templateUrl: './editPost.component.html',
  styleUrls: ['./editPost.component.scss']
})

export class EditForm {
  newPost = {};

  @Input() status: boolean;
  @Input() postInputData: Object;
  @Output() Post = new EventEmitter();


  ngOnChanges() {
    this.formInit(this.postInputData)
    this.clearForm()
  }

  clearForm() {
    if (typeof this.status !== 'undefined') {
      if (this.status) {
        this.newPost = []
      } else {
        alert("Post no posted")
      }
    }
  }

  formInit(data) {
    if (data.action === 'create') {
      this.newPost = {}
    } else {
      this.newPost = {
        id: data.postInput.id,
        title: data.postInput.title,
        description: data.postInput.description,
        index: data.index
      }
    }
  }

  sendData() {
    this.Post.emit(this.newPost)
  }
}
