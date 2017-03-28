import { Component, Output, EventEmitter } from '@angular/core';
import { Post } from './post';
import { PostService } from './post.service';

@Component({
  selector: 'posts',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})

export class Posts {
  posts: Post[];
  newPost = [];
  formShow: boolean = false;
  postInputData: Object;
  status: boolean;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getPosts()
        .subscribe(data => {
          this.posts = data
          if (this.posts.length === 0) {
            this.formShow = true
          }
        })
  }

  formController(action, post, index) {
    this.formShow = true
    this.status = undefined

    if (action === 'create') {
      this.postInputData = {
        action: 'create'
      }
    }
    else {
      this.postInputData = {
        action: 'update',
        postInput: post,
        index: index
      }
    }
  }

  postAction(post) {
    if(typeof post.index !== 'undefined' && post.index) {
      this.editPost(post)
    } else {
      this.createPost(post)
    }
  }

  createPost(post) {
    this.postService.createPost(post)
        .subscribe(data => {
          this.posts.push(data)
          this.status = true
          this.formShow = false
        })
  }

  editPost(post) {
    this.postService.editPost(post)
        .subscribe(data => {
          this.ngOnInit()
          this.status = true
          this.formShow = false
        })
  }

  deletePost(postId, index) {
    this.postService.deletePost(postId)
        .subscribe(data => this.posts.splice(index, 1))
  }
}
