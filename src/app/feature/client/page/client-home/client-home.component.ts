import { Component } from '@angular/core';
import { OrdersComponent } from 'src/app/feature/order/components/orders/orders.component';
import { UpdateUserComponent } from 'src/app/feature/user/components/update-user/update-user.component';
import { UserProfilComponent } from 'src/app/feature/user/components/user-profil/user-profil.component';

@Component({
  selector: 'app-client-home',
  standalone: true,
  imports: [OrdersComponent, UserProfilComponent, UpdateUserComponent],
  templateUrl: './client-home.component.html',
  styleUrl: './client-home.component.scss',
})
export class ClientHomeComponent {}
