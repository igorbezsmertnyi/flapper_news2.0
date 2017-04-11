import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Post } from '../Posts/post';

@Injectable()
export class PreviewService {
  headers: any;

  constructor(private http: Http) {
    this.headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    });
    this.headers = new RequestOptions({ headers: this.headers })
  }

  showPost(id) {
    return this.http.get(`/api/v1/news_page/${id}.json`)
           .map(response => <Post[]>response.json())
  }
}
