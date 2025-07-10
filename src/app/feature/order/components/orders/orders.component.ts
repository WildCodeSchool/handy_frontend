import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Orders } from '../../models/Orders';
import { OrdersService } from '../../services/orders.service';
import { CommonModule } from '@angular/common';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  orders: Orders[] = [];
  error?: string;

  
    private _ordersService = inject(OrdersService);
    private _destroyRef =inject (DestroyRef);

  ngOnInit(): void {
    this._ordersService
      .getMyOrders()
      .pipe(
        tap(data => {
          this.orders = data;
        }),
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe();
  }
}
