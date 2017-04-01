import { Injectable } from '@angular/core';
import { Post } from './components/Posts/post';

@Injectable()
export class AppData {
  post: Post[];

  storePost(post) {
     this.post = post
  }

  sharePost() {
    return this.post
  }
}
