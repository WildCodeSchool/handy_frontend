import { Routes } from '@angular/router';
import { HomePageComponent } from './feature/home/pages/home-page/home-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    pathMatch: 'full',
  },

  // {
  // //   path: 'article/:id',
  // //   component: ArticlePageComponent,
  // },
  // {
  // //   path: 'contact',
  // //   component: ContactPageComponent,
  // },
  // {
  //   path: 'signup',
  //  component: SignupFormComponent
  // },
  // {
  // //   path: '**',
  // //   component: NotFoundPageComponent
  // }
];
