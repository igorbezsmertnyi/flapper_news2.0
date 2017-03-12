import { Component } from '@angular/core';
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

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getPosts()
        .subscribe(data => this.posts = data);
  }

  createPost() {
    this.postService.createPost(this.newPost)
        .subscribe(data => this.posts = data);
  }
}
