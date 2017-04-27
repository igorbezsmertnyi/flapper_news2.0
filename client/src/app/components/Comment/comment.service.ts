import { Injectable } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { REQUEST_HEADER, COOKIE_KEYS, API } from '../../app.constans';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CommentService {
  headers: any;
  current_user: any;

  constructor(private http: Http,
              private _cookieService: CookieService) {
    this.headers = REQUEST_HEADER
    this.headers = new RequestOptions({ headers: this.headers })
    this.current_user = this._cookieService.getObject(COOKIE_KEYS.SEESION_HASH)
  }

  addComment(comment, id) {
    let body = JSON.stringify({body: comment.body,
                               token: this.current_user.token});
    return this.http.post(`${API.V1.NEWS_PAGE_INDEX}/${id}/news_comments`, body, this.headers)
           .map((res: Response) => res.json())
  }

  destroyComment(postId, commentId) {
    return this.http.delete(`${API.V1.NEWS_PAGE_INDEX}/${postId}/news_comments/${commentId}`)
               .map((res: Response) => res.json())
  }
}
