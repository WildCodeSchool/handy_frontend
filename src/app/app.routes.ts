import { Routes } from '@angular/router';
import { HomePageComponent } from './feature/home/pages/home-page/home-page.component';
import { ProductPageComponent } from './feature/product/page/product-page/product-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    pathMatch: 'full',
  },

  {
    path: 'products',
    component: ProductPageComponent,
  },
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
