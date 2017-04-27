import { Component, Input } from '@angular/core';
import { Post } from '../../components/Posts/post';
import { PreviewService } from './previewpost.service';

@Component({
  selector: 'preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})

export class Preview {
  post: Post[];
  @Input() postId: number;

  constructor(private previewService: PreviewService) { }

  ngOnInit() {
    this.previewService.showPost(this.postId)
        .subscribe(data => this.post = data)
  }
}
