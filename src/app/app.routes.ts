import { Routes } from '@angular/router';
import { HomePageComponent } from './feature/home/pages/home-page/home-page.component';
import { ProductPageComponent } from './feature/product/page/product-page/product-page.component';
import { UserConnectionComponent } from './feature/user/components/user-connection/user-connection.component';
//import { isLoggedInGuard } from './core/guards/is-logged-in.guard';
import { isAdminGuard } from './core/guards/is-admin.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    pathMatch: 'full',
  },

  { path: '', redirectTo: '', pathMatch: 'full' },

  {
    path: 'products',
    component: ProductPageComponent,
    
    canActivate: [isAdminGuard],
    //canActivate: [isLoggedInGuard],
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
