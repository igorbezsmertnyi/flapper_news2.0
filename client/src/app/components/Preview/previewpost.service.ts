import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Post } from '../Posts/post';
import { REQUEST_HEADER, API } from '../../app.constans';

@Injectable()
export class PreviewService {
  headers: any;

  constructor(private http: Http) {
    this.headers = new Headers({REQUEST_HEADER});
    this.headers = new RequestOptions({ headers: this.headers })
  }

  showPost(id) {
    return this.http.get(`${API.V1.NEWS_PAGE_INDEX}/${id}.json`)
           .map(response => <Post[]>response.json())
  }
}
