import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'show-post',
  templateUrl: './showpost.container.html',
  styleUrls: ['./showpost.container.scss']
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
