import { Routes } from '@angular/router';
import { HomePageComponent } from './feature/home/pages/home-page/home-page.component';
import { ProductPageComponent } from './feature/product/page/product-page/product-page.component';
import { UserConnectionComponent } from './feature/user/components/user-connection/user-connection.component';
import { isAdminGuard } from './core/guards/is-admin.guard';
import { CreateUserComponent } from './feature/user/components/create-user/create-user.component';
import { isProviderGuard } from './core/guards/is-provider.guard';
import { ProviderHomeComponent } from './feature/provider/page/provider-home/provider-home.component';
import { ClientHomeComponent } from './feature/client/page/client-home/client-home.component';
import { isLoggedInGuard } from './core/guards/is-logged-in.guard';
import { AdminHomeComponent } from './feature/admin/page/admin-home/admin-home.component';
import { OrderCartComponent } from './feature/cart/components/order-cart/order-cart.component';
import { CreateCartComponent } from './feature/cart/components/create-cart/create-cart.component';
import { ProvidersListComponent } from './feature/provider/components/providers-list/providers-list.component';
import { ProviderOneComponent } from './feature/provider/components/provider-one/provider-one.component';
import { AvailabilityComponent } from './feature/availability/components/availability/availability.component';
import { CalendarComponent } from './feature/calendars/components/calendar/calendar.component';
import { CrudUserComponent } from './feature/user/page/crud-user/crud-user.component';
import { AboutUsComponent } from './feature/home/components/about-us/about-us.component';
import { ContactComponent } from './feature/contact/contact.component';

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
  },
  {
    path: 'calendar',
    component: CalendarComponent,
  },
  {
    path: 'contacts',
    component: ContactComponent,
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
  },
  {
    path: 'availability',
    component: AvailabilityComponent,
  },
  {
    path: 'signup',
    component: CreateUserComponent,
  },
  { path: 'auth', component: UserConnectionComponent },

  {
    path: 'providers',
    component: ProviderHomeComponent,

    canActivate: [isProviderGuard],
  },
  {
    path: 'provider/:id',
    loadComponent: () => import('./feature/provider/components/provider-one/provider-one.component').then(m => m.ProviderOneComponent),
  },
  {
    path: 'admin',
    component: AdminHomeComponent,
    canActivate: [isAdminGuard],
  },
  {
    path: 'users-list',
    component: CrudUserComponent,
    canActivate: [isAdminGuard],
  },
  {
    path: 'client',
    component: ClientHomeComponent,
    canActivate: [isLoggedInGuard],
  },
  {
    path: 'order-cart',
    component: OrderCartComponent,
  },
  {
    path: 'create-cart',
    component: CreateCartComponent,
  },
  {
    path: 'providers-list',
    component: ProvidersListComponent,
  },
  {
    path: 'provider-one/:id',
    component: ProviderOneComponent,
  },
  {
    path: 'order',
    loadComponent: () => import('./feature/cart/page/cart/cart.component').then(c => c.CartComponent),
  },
];
