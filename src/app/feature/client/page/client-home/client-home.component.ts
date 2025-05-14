import { Component } from '@angular/core';
import { OrdersComponent } from 'src/app/feature/order/components/orders/orders.component';

@Component({
  selector: 'app-client-home',
  standalone: true,
  imports: [OrdersComponent],
  templateUrl: './client-home.component.html',
  styleUrl: './client-home.component.scss',
})
export class ClientHomeComponent {}
