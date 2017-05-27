//Modules
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCheckboxModule, MdSliderModule, MdInputModule,
         MdSelectModule, MdIconModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
//Services
import { StateService } from './states.service';
import { StoreService } from './store.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { PostService } from './components/Posts/post.service';
import { PreviewService } from './components/Preview/previewpost.service';
import { CommentService } from './components/Comment/comment.service';
import { AuthService } from './auth.service';
import { LocalStorage } from './localStorage.service';
//Plugins
import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';
import { ColorPickerModule } from 'ngx-color-picker';
import 'hammerjs';
//Containers
import { AppContainer } from './containers/AppContainer/appContainer.container';
import { HomePage } from './containers/homePage/homePage.container';
import { ShowPost } from './containers/ShowPost/showpost.container';
import { LogInPage } from './containers/LogInPage/login.container';
//Components
import { Posts } from './components/Posts/post.component';
import { Comment } from './components/Comment/comment.component';
import { EditForm } from './containers/EditPostForm/editPost.component';
import { Preview } from './components/Preview/preview.component';
import { Registration } from './components/Registration/registration.component';
import { LogIn } from './components/LoginForm/login.component';
import { AppMenu } from './components/AppMenu/appmenu.component';
import { LogOut } from './components/LogOut/logout.componet';
import { Upvote } from './components/Upvote/upvote.component';
import { FirstStep } from './components/CreatePostSteps/FirstStep/firstStep.component';
import { SecondStep } from './components/CreatePostSteps/SecondStep/secondStep.component';
import { ThirdStep } from './components/CreatePostSteps/ThirdStep/thirdStep.component';
import { HeaderStaps } from './components/CreatePostSteps/HeaderSteps/headerSteps.component';
import { Spinner } from './components/Spinner/spinner.componnet';
import { AddPostBtn } from './components/AddPostBtn/addPostBtn.component';
import { FavoritPost } from './components/FavoritsPost/favoritPost.component';

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
    Upvote,
    FirstStep,
    SecondStep,
    ThirdStep,
    HeaderStaps,
    Spinner,
    AddPostBtn,
    FavoritPost
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MdSliderModule,
    ColorPickerModule,
    MdInputModule,
    MdSelectModule,
    MdIconModule,
    MdButtonModule
  ],
  providers: [
    CookieService,
    PostService,
    CommentService,
    PreviewService,
    AuthService,
    LocalStorage,
    StateService,
    StoreService
   ],
  bootstrap: [ AppContainer, Spinner ]
})
export class AppModule { }
