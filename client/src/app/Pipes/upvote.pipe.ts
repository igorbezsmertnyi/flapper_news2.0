import { Pipe, PipeTransform } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { COOKIE_KEYS } from '../app.constans';

@Pipe({
  name: 'upvoteClass'
})

export class UpvotePipe implements PipeTransform {
  current_session: any;

  constructor(private _cookieService: CookieService) {
    this.current_session = this._cookieService.getObject(COOKIE_KEYS.SEESION_HASH)
  }

  transform(value: any, args: string[]): any {
    if (!value) return value;

    value.upvotes.find(val => {
      if (val.user_id === this.current_session.id) {
        return val
      }
    })
  }
}
