import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { HttpClient } from '@angular/common/http';
import { AppProvider } from 'src/app/feature/product/models/provider';
import { CommonModule } from '@angular/common';
import { ProviderWithServicesDTO } from '../../models/ProviderWithServicesDTO';
import { tap } from 'rxjs';

@Component({
  selector: 'app-order-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-cart.component.html',
  styleUrl: './order-cart.component.scss',
})
export class OrderCartComponent implements OnInit {
  providersWithServices: ProviderWithServicesDTO[] = [];
  selectedServices: { userId: number; provisionId: number }[] = [];

  selectedProvider: AppProvider[] = [];
  isSelectedServicesVisible = true;
  imageUrls: string[] = ['assets/lady.jpg', 'assets/kitchen.jpg', 'assets/together.jpg', 'assets/speed.jpg'];

  constructor(
    private _http: HttpClient,
    private _cartService: CartService
  ) {}
  ngOnInit(): void {
    this._cartService
      .getProvidersWithServices()
      .pipe(
        tap(data => {
          this.providersWithServices = data.map(provider => ({
            ...provider,
            services: provider.services || [],
          }));
        })
      )
      .subscribe();

    this._cartService.cart$
      .pipe(
        tap(cart => {
          this.selectedServices = cart;
        })
      )
      .subscribe();
  }

  addToCart(providerId: number, serviceId: number): void {
    const userId = providerId;
    const exists = this.selectedServices.some(item => item.userId === userId && item.provisionId === serviceId);

    if (!exists) {
      const item = { userId, provisionId: serviceId };
      this.selectedServices.push(item);
      this._cartService.addToCart(item);
    }
  }

  clearCart(): void {
    this._cartService.clearCart();
    this.selectedServices = [];
  }
  removeFromCart(providerId: number, provisionId: number): void {
    this._cartService.removeFromCart(providerId, provisionId);
  }

  getProviderInfo(userId: number): ProviderWithServicesDTO | undefined {
    return this.providersWithServices.find(p => p.providerId === userId);
  }

  getServiceInfo(userId: number, provisionId: number): AppProvider | undefined {
    const provider = this.getProviderInfo(userId);
    return provider?.services.find(s => s.id === provisionId);
  }

  getTotalCoefficient(): number {
    return this.selectedServices.reduce((total, item) => {
      const service = this.getServiceInfo(item.userId, item.provisionId);
      return total + (service?.coeff || 0);
    }, 0);
  }
  closeSelectedServices(): void {
    this.isSelectedServicesVisible = false;
  }
}
export type { ProviderWithServicesDTO };
