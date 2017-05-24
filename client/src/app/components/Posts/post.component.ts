import { Component, Output, EventEmitter } from '@angular/core';
import { Post } from './post';
import { PostService } from './post.service';
import { CookieService } from 'angular2-cookie/core';
import { COOKIE_KEYS } from '../../app.constans';
import { StateService } from '../../states.service'

@Component({
  selector: 'posts',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})

export class Posts {
  posts: Post[];
  newPost = [];
  formShow: boolean = false;
  postInputData: Object = { action: 'create' };
  status: boolean;
  current_session: any;

  constructor(private postService: PostService,
              protected _cookieService: CookieService,
              private st: StateService) {
    this.current_session = this._cookieService.getObject(COOKIE_KEYS.SEESION_HASH)
  }

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
    this.st.spinnrIsOpen(true)
    this.createPost(post)
    // if(typeof post.index !== 'undefined' || post.index) {
    //   this.editPost(post)
    // } else {
    //   this.createPost(post)
    // }
  }

  createPost(post) {

    this.postService.createPost(post)
        .subscribe(data => {
          this.st.spinnrIsOpen(true, true)
          this.posts.push(data)
          this.status = true
          this.formShow = false
        }, err => this.st.spinnrIsOpen(true, false))
  }

  editPost(post) {
    this.postService.editPost(post)
        .subscribe(data => {
          this.ngOnInit()
          this.status = true
          this.formShow = false
        })
  }

  upvoteActions(data) {
    if (data.action) {
      this.upvotePost(data)
    } else {
      this.disupvotePost(data)
    }
  }

  upvotePost(data) {
    this.postService.upvotePost(data.post).subscribe(
      res => this.posts[data.index] = res,
      err => console.log(err)
    )
  }

  disupvotePost(data) {
    this.postService.disupvotePost(data.post).subscribe(
      res => this.posts[data.index] = res,
      err => console.log(err)
    )
  }

  deletePost(postId, index) {
    this.postService.deletePost(postId)
        .subscribe(data => this.posts.splice(index, 1))
  }
}
