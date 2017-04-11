import { Post } from './post';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PostService {
  headers: any;

  constructor(private http: Http) {
    this.headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    });
    this.headers = new RequestOptions({ headers: this.headers })
  }

  getPosts() {
    return this.http.get('/api/v1/news_page.json')
           .map(response => <Post[]>response.json())
  }

  createPost(postBody) {
    let body = JSON.stringify({title: postBody.title, description: postBody.description});
    return this.http.post('/api/v1/news_page.json', body, this.headers)
           .map((res: Response) => res.json())
  }

  editPost(post) {
    let body = JSON.stringify({title: post.title, description: post.description});
    return this.http.put(`/api/v1/news_page/${post.id}`, body, this.headers)
           .map((res: Response) => res.json())
  }

  deletePost(postId) {
    return this.http.delete(`/api/v1/news_page/${postId}.json`)
            .map(response => response.json())
  }
}
