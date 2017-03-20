import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { HomePage } from './containers/homePage/homePage.component';
import { Posts } from './components/Posts/post.component';
import { PostService } from './components/Posts/post.service';
import { Comment } from './components/Comment/comment.component';
import { EditForm} from './components/EditPostForm/editPost.component';

@NgModule({
  declarations: [
    HomePage,
    Posts,
    Comment,
    EditForm
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ PostService ],
  bootstrap: [HomePage]
})
export class AppModule { }
