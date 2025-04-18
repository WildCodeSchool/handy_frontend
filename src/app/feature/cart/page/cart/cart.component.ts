import { Component } from '@angular/core';
import { OrderCartComponent } from '../../components/order-cart/order-cart.component';
import { CreateCartComponent } from '../../components/create-cart/create-cart.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [OrderCartComponent, CreateCartComponent, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  isCartVisible = false;

  toggleCartVisibility(): void {
    this.isCartVisible = !this.isCartVisible;
    console.log('Panier visible ?', this.isCartVisible);
  } }
