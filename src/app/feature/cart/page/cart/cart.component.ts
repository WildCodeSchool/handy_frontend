import { Component, DestroyRef, inject } from '@angular/core';
import { OrderCartComponent } from '../../components/order-cart/order-cart.component';
import { CreateCartComponent } from '../../components/create-cart/create-cart.component';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [OrderCartComponent, CreateCartComponent, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  isCartVisible = false;
  animateBadge = false;

  public _cartService = inject(CartService);
  private _destroyRef = inject(DestroyRef);
  triggerBadgeAnimation(): void {
    this.animateBadge = true;
    setTimeout(() => (this.animateBadge = false), 300);
  }

  toggleCartVisibility(): void {
    this.isCartVisible = !this.isCartVisible;
  }
}
