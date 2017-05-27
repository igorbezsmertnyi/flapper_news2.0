import { Component } from '@angular/core'
import { PostService } from '../Posts/post.service'

@Component({
  selector: 'favorit-post',
  templateUrl: './favoritPost.component.html',
  styleUrls: ['./favoritPost.component.scss']
})

export class FavoritPost {
  favoritPost:any = {}
  isHover:boolean = false

  constructor(private postService: PostService) {}

  onHover(i) {
    document.getElementById(i).classList.add('favorit-post__content__hover-info--active')
  }

  onUnHover(i) {
    document.getElementById(i).classList.remove('favorit-post__content__hover-info--active')
  }

  ngOnInit() {
    this.postService.getPosts()
      .subscribe(data => {
        this.favoritPost = data
        this.favoritPost = this.favoritPost.slice(0, 4)
      },
      err => console.log(err))
  }
}
