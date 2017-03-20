import { Component, Output } from '@angular/core';
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
  status: Boolean = false;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getPosts()
        .subscribe(data => this.posts = data);
  }

  createPost(post) {
    this.postService.createPost(post)
        .subscribe(data => {
          this.posts.push(data);
          this.status = true;
        });
  }

  editPost(postId, index) {
    this.postService.createPost(this.newPost)
        .subscribe(data => {
          this.posts.splice(index, 1)
        })
  }

  deletePost(postId, index) {
    this.postService.deletePost(postId)
        .subscribe(data => this.posts.splice(index, 1));
  }
}
