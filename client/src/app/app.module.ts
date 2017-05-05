//Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
//Services
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { AppData } from './appData.service';
import { PostService } from './components/Posts/post.service';
import { PreviewService } from './components/Preview/previewpost.service';
import { CommentService } from './components/Comment/comment.service';
import { AuthService } from './auth.service';
//Pipes

//Containers
import { AppContainer } from './containers/AppContainer/appContainer.container';
import { HomePage } from './containers/homePage/homePage.container';
import { ShowPost } from './containers/ShowPost/showpost.container';
import { LogInPage } from './containers/LogInPage/login.container';
//Components
import { Posts } from './components/Posts/post.component';
import { Comment } from './components/Comment/comment.component';
import { EditForm } from './components/EditPostForm/editPost.component';
import { Preview } from './components/Preview/preview.component';
import { Registration } from './components/Registration/registration.component';
import { LogIn } from './components/LoginForm/login.component';
import { AppMenu } from './components/AppMenu/appmenu.component';
import { LogOut } from './components/LogOut/logout.componet';
import { Upvote } from './components/Upvote/upvote.component';

@NgModule({
  declarations: [
    HomePage,
    Posts,
    Comment,
    EditForm,
    ShowPost,
    AppContainer,
    Preview,
    Registration,
    LogIn,
    LogInPage,
    AppMenu,
    LogOut,
    Upvote
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  providers: [
    CookieService,
    PostService,
    AppData,
    CommentService,
    PreviewService,
    AuthService
   ],
  bootstrap: [ AppContainer, AppMenu ]
})
export class AppModule { }
