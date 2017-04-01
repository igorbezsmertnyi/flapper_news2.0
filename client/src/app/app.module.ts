//Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
//Services
import { AppData } from './appData.service';
import { PostService } from './components/Posts/post.service';
import { PreviewService } from './components/Preview/previewpost.service';
import { CommentService } from './components/Comment/comment.service';
//Containers
import { AppContainer } from './containers/AppContainer/appContainer.component';
import { HomePage } from './containers/homePage/homePage.component';
import { ShowPost } from './containers/ShowPost/showpost.component';
//Containers
import { Posts } from './components/Posts/post.component';
import { Comment } from './components/Comment/comment.component';
import { EditForm } from './components/EditPostForm/editPost.component';
import { Preview } from './components/Preview/preview.component';

@NgModule({
  declarations: [
    HomePage,
    Posts,
    Comment,
    EditForm,
    ShowPost,
    AppContainer,
    Preview
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    PostService,
    AppData,
    CommentService,
    PreviewService
   ],
  bootstrap: [ AppContainer ]
})
export class AppModule { }
