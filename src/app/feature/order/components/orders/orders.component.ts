import { Component, OnInit } from '@angular/core';
import { Orders } from '../../models/Orders';
import { OrdersService } from '../../services/orders.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  orders: Orders[] = [];
  error?: string;

  constructor(private _ordersService: OrdersService) {}

  ngOnInit(): void {
    this._ordersService.getMyOrders().subscribe({
      next: (data) => {
        this.orders = data;
      },
    });
  }
}
