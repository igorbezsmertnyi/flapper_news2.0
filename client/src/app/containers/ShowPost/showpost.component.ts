import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'show-post',
  templateUrl: './showpost.component.html',
  styleUrls: ['./showpost.component.scss']
})

export class ShowPost {
  postId: any;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.postId = params['id']
    })
  }
}
