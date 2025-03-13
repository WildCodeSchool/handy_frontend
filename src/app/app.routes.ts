import { Routes } from '@angular/router';
import { HomePageComponent } from './feature/home/pages/home-page/home-page.component';
import { ProductPageComponent } from './feature/product/page/product-page/product-page.component';
import { UserConnectionComponent } from './feature/user/user-connection/user-connection.component';

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
  {
  path: 'contact',
  component: UserConnectionComponent,
  },
  // {
  //   path: 'signup',
  //  component: SignupFormComponent
  // },
  // {
  // //   path: '**',
  // //   component: NotFoundPageComponent
  // }
];
