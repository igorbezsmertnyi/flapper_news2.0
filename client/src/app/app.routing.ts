import { ModuleWithProviders }  from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePage } from './containers/homePage/homePage.component';
import { ShowPost } from './containers/ShowPost/showpost.component';

const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'post/:id', component: ShowPost }
]

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
