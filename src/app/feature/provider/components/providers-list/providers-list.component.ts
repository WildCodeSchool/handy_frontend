import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ProviderWithServicesDTO } from 'src/app/feature/cart/models/ProviderWithServicesDTO';
import { CartService } from 'src/app/feature/cart/services/cart.service';
import { AppProvider } from 'src/app/feature/product/models/provider';

@Component({
  selector: 'app-providers-list',
  standalone: true,
  imports: [RouterModule, AsyncPipe],
  templateUrl: './providers-list.component.html',
  styleUrl: './providers-list.component.scss',
})
export class ProvidersListComponent {
  providersWithServices: ProviderWithServicesDTO[] = [];
  selectedServices: { userId: number; provisionId: number }[] = [];

  imageUrls: string[] = ['assets/parkinson.jpg', 'assets/call.jpg', 'assets/office.jpg', 'assets/working-together.jpg', 'assets/mer.jpg'];
  selectedProvider: AppProvider[] = [];

  private _http = inject(HttpClient);
  private _cartService = inject(CartService);

  providersWithServices$: Observable<ProviderWithServicesDTO[]> = this._cartService.getProvidersWithServices().pipe(
    map(providers =>
      providers.map(provider => ({
        ...provider,
        services: provider.services || [],
      }))
    )
  );

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
}
