import { Component, inject } from '@angular/core';
import { Orders } from '../../models/Orders';
import { OrdersService } from '../../services/orders.service';
import { CommonModule } from '@angular/common';
import { catchError, Observable, of } from 'rxjs';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  orders: Orders[] = [];
  error?: string;

  private _ordersService = inject(OrdersService);

  orders$: Observable<Orders[]> = this._ordersService.getMyOrders().pipe(
    catchError(err => {
      console.error('Erreur de chargement des commandes:', err);
      this.error = 'Impossible de charger les commandes.';
      return of([]);
    })
  );
}
