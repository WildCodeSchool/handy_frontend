import { Component,OnInit } from '@angular/core';
import { ProvisionCartItem } from '../../models/ProvisionCartItem';
import { CartService } from '../../services/cart.service';
import { CommonModule, NgClass } from '@angular/common';
import { ProviderWithServicesDTO } from '../order-cart/order-cart.component';
import { AppProvider } from 'src/app/feature/product/models/provider';

@Component({
  selector: 'app-create-cart',
  standalone: true,
  imports: [NgClass, CommonModule],
  templateUrl: './create-cart.component.html',
  styleUrl: './create-cart.component.scss'
})
export class CreateCartComponent implements OnInit {
  cart: ProvisionCartItem[] = [];
  toastMessage: string = '';
  toastType: 'success' | 'error' | '' = '';
  providersWithServices: ProviderWithServicesDTO[] = [];


  constructor(private _cartService: CartService) {}

  ngOnInit(): void {
    this._cartService.getProvidersWithServices().subscribe({
      next: (data) => {
        this.providersWithServices = data.map(provider => ({
          ...provider,
          services: provider.services || []
        }));
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des providers:', err);
      }
    });
  
    this._cartService.cart$.subscribe(cart => {
      this.cart = cart;
    });
  }

  showToast(message: string, type: 'success' | 'error'):void {
    this.toastMessage = message;
    this.toastType = type;
    setTimeout(() => {
      this.toastMessage = '';
      this.toastType = '';
    }, 3000);
  }

  removeFromCart(providerId: number, provisionId: number): void {
    this._cartService.removeFromCart(providerId, provisionId);
    
  }

  clearCart(): void {
    this._cartService.clearCart();
    
  }

  submitCart(): void {
    this._cartService.submitCart().subscribe({
      next: (response) => {
        console.log('Commande envoyée avec succès ✅', response);
        alert('Commande envoyée !');
        this.clearCart();
      },
      error: (error) => {
        console.error('Erreur lors de la commande ❌', error);
        alert('Une erreur est survenue');
      }
    });
  }

  getProviderInfo(userId: number): ProviderWithServicesDTO | undefined {
    return this.providersWithServices.find(p => p.providerId === userId);
  }
  
  getServiceInfo(userId: number, provisionId: number): AppProvider | undefined {
    const provider = this.getProviderInfo(userId);
    return provider?.services.find(s => s.id === provisionId);
  }
  
  getTotalCoefficient(): number {
    return this.cart.reduce((total, item) => {
      const service = this.getServiceInfo(item.userId, item.provisionId);
      return total + (service?.coeff || 0);
    }, 0);
  }
}