import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CommentService {
  headers: any;

  constructor(private http: Http) {
    this.headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    });
    this.headers = new RequestOptions({ headers: this.headers })
  }

  addComment(comment, id) {
    let body = JSON.stringify({body: comment.body});
    return this.http.post(`/news_page/${id}/news_comments.json`, body, this.headers)
           .map((res: Response) => res.json())
  }
}
