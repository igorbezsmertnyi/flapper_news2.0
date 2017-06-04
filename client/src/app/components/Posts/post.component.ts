import { Component, Output, EventEmitter } from '@angular/core';
import { Post } from './post';
import { PostService } from './post.service';
import { CookieService } from 'angular2-cookie/core';
import { COOKIE_KEYS } from '../../app.constans';
import { StateService } from '../../states.service'
import { StoreService} from '../../store.service'

@Component({
  selector: 'posts',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})

export class Posts {
  posts: Post[];
  newPost = [];
  formActive: boolean = false;
  postInputData: Object = { action: 'create' };
  postIsUpdate: boolean = false
  status: boolean;
  current_session: any = {}

  constructor(private postService: PostService,
              protected _cookieService: CookieService,
              private st: StateService,
              protected sr: StoreService) {
    this.st.formOpen.subscribe(val => this.formActive = val)
    this.sr.userSession.subscribe(val => this.current_session = val)
    this.st.postUpdate.subscribe(val => this.postIsUpdate = val)
  }

  ngOnInit() {
    this.postService.getPosts()
        .subscribe(data => {
          this.posts = data
          if (this.posts.length === 0) {
            this.formActive = true
          }
        })
  }

  editPostInit(action, post, index) {
    this.st.formIsOpen(true)
    this.st.postIsUpdate(true)

    let _firstStep = {
      title: post.title,
      subtitle: post.subtitle,
      categories: post.categories,
    }

    let _secondStep = {
      overlay: {
        color: post.cover.color,
        opacity: post.cover.opacity,
        blur: post.cover.blur,
        gray: post.cover.gray
      },
      source: `${window.location.origin}${post.cover.image_url}`
    }

    this.sr.setFistStepData(_firstStep)
    this.sr.setSecondStepData(_secondStep)
    this.sr.setThirdStepData(post.content)

    this.postInputData = {
      postId: post.id,
    }
  }

  postAction(post) {
    this.st.spinnrIsOpen(true)
    if (this.postIsUpdate) {
      this.editPost(post)
    } else {
      this.createPost(post)
    }
  }

  createPost(post) {
    this.postService.createPost(post)
        .subscribe(data => {
          this.st.spinnrIsOpen(true, true)
          this.posts.push(data)
          this.st.setPostStatus(true)
          this.status = true
          this.formActive = false
        }, err => {
          this.st.setPostStatus(false)
          this.st.spinnrIsOpen(true, false)
        })
  }

  editPost(post) {
    this.postService.editPost(post)
        .subscribe(data => {
          this.ngOnInit()
          this.st.spinnrIsOpen(true, true)
          this.st.setPostStatus(true)
          this.status = true
          this.formActive = false
        }, err => {
          this.st.setPostStatus(false)
          this.st.spinnrIsOpen(true, false)
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
