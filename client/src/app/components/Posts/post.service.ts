import { Post } from './post';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { CookieService } from 'angular2-cookie/core';
import { REQUEST_HEADER, COOKIE_KEYS, API } from '../../app.constans';
import 'rxjs/add/operator/map';

@Injectable()
export class PostService {
  headers: any;
  current_session: any;

  constructor(private http: Http,
              private _cookieService: CookieService) {
    this.headers = new Headers(REQUEST_HEADER);
    this.headers = new RequestOptions({ headers: this.headers })
    this.current_session = this._cookieService.getObject(COOKIE_KEYS.SEESION_HASH)
  }

  getPosts() {
    return this.http.get(API.V1.NEWS_PAGE_INDEX)
           .map(response => <Post[]>response.json())
  }

  createPost(postBody) {
    let body = JSON.stringify({title: postBody.title,
                               content: postBody.content,
                               token: this.current_session.token});
    return this.http.post(API.V1.NEWS_PAGE_INDEX, body, this.headers)
           .map((res: Response) => res.json())
  }

  editPost(post) {
    let body = JSON.stringify({title: post.title, description: post.description});
    return this.http.put(`${API.V1.NEWS_PAGE_INDEX}/${post.id}`, body, this.headers)
           .map((res: Response) => res.json())
  }

  upvotePost(post) {
    let body = JSON.stringify({likes: post.likes,
                               token: this.current_session.token})
    return this.http.put(`${API.V1.NEWS_PAGE_INDEX}/${post.id}/upvote`, body, this.headers)
               .map((res: Response) => res.json())
  }

  disupvotePost(post) {
    let body = JSON.stringify({likes: post.likes,
                               token: this.current_session.token})
    return this.http.put(`${API.V1.NEWS_PAGE_INDEX}/${post.id}/disupvote`, body, this.headers)
               .map((res: Response) => res.json())
  }

  deletePost(postId) {
    return this.http.delete(`${API.V1.NEWS_PAGE_INDEX}/${postId}`)
            .map(response => response.json())
  }
}
