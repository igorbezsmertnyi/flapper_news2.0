import { Post } from './post';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PostService {
  constructor(private http: Http) { }

  getPosts() {
    return this.http.get('/news_page.json')
           .map(response => <Post[]>response.json())
  }

  createPost(post) {
    console.log(post)
    return this.http.post('/news_page.json', post)
           .map(response => response.json())
  }
}
