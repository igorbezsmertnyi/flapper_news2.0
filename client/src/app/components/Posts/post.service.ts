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

  createPost(post_body) {
    console.log(post_body);
    let method = "getDepartments";
    let body = JSON.stringify({title: post_body.title, description: post_body.description});
    console.log(body);
    let headers = new Headers({
                                'Content-Type': 'application/json; charset=utf-8',
                                'Access-Control-Allow-Origin': '*',
                                'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
                              });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('/news_page.json', body, options)
           .map((res: Response) => res.json())
  }
}
