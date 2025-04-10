import { Routes } from '@angular/router';
import { HomePageComponent } from './feature/home/pages/home-page/home-page.component';
import { ProductPageComponent } from './feature/product/page/product-page/product-page.component';
import { UserConnectionComponent } from './feature/user/components/user-connection/user-connection.component';
//import { isLoggedInGuard } from './core/guards/is-logged-in.guard';
import { isAdminGuard } from './core/guards/is-admin.guard';
import { CreateUserComponent } from './feature/user/components/create-user/create-user.component';
import { isProviderGuard } from './core/guards/is-provider.guard';
import { ProviderHomeComponent } from './feature/provider/page/provider-home/provider-home.component';
import { AdminHomeComponent } from './feature/admin/page/admin-home/admin-home.component';
import { ClientHomeComponent } from './feature/client/page/client-home/client-home.component';
import { isLoggedInGuard } from './core/guards/is-logged-in.guard';

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
    component: CreateUserComponent,
  },
  { path: 'auth', component: UserConnectionComponent },

  {
    path: 'providers',
    component: ProviderHomeComponent,

    canActivate: [isProviderGuard],
  },
  {
    path: 'admin',
    component: AdminHomeComponent,
    canActivate: [isAdminGuard],
    
  },
  {
    path: 'client',
    component: ClientHomeComponent,
    canActivate: [isLoggedInGuard],
    
  }

  // {
  // //   path: '**',
  // //   component: NotFoundPageComponent
  // }
];
