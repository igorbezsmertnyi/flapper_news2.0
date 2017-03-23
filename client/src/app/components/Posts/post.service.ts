import { Post } from './post';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PostService {
  constructor(private http: Http) { }

  getPosts() {
    return this.http.get('/news_page.json')
           .map(response => <Post[]>response.json())
  }

  createPost(postBody) {
    let body = JSON.stringify({title: postBody.title, description: postBody.description});
    let headers = new Headers({
                                'Content-Type': 'application/json; charset=utf-8',
                                'Access-Control-Allow-Origin': '*',
                                'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
                              });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('/news_page.json', body, options)
           .map((res: Response) => res.json())
  }

  editPost(postId, postBody) {
    let body = JSON.stringify({title: postBody.title, description: postBody.description});
    return this.http.put(`/news_page/${postId}`, body)
           .map((res: Response) => res.json())
  }

  deletePost(postId) {
    return this.http.delete(`/news_page/${postId}.json`)
            .map(response => response.json())
  }
}
