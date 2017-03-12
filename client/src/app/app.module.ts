import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { HomePage } from './containers/homePage/homePage.component';
import { Posts } from './components/Posts/post.component';
import { PostService } from './components/Posts/post.service';

@NgModule({
  declarations: [
    HomePage,
    Posts
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
