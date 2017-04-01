import { Component, Input } from '@angular/core';
import { CommentService } from './comment.service';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})

export class Comment {
  @Input() comments: any;
  @Input() id: number;
  newComment = {};

  constructor(private commentService: CommentService) { }

  addComment() {
    this.commentService.addComment(this.newComment, this.id)
        .subscribe(data => {
          this.comments.push(data)
          this.newComment = {}
        })
  }
}
