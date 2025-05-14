import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProviderWithServicesDTO } from 'src/app/feature/cart/models/ProviderWithServicesDTO';
import { CartService } from 'src/app/feature/cart/services/cart.service';
import { AppProvider } from 'src/app/feature/product/models/provider';

@Component({
  selector: 'app-providers-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './providers-list.component.html',
  styleUrl: './providers-list.component.scss',
})
export class ProvidersListComponent implements OnInit {
  providersWithServices: ProviderWithServicesDTO[] = [];
  selectedServices: { userId: number; provisionId: number }[] = [];

  selectedProvider: AppProvider[] = [];
  constructor(
    private _http: HttpClient,
    private _cartService: CartService
  ) {}

  ngOnInit(): void {
    this._cartService.getProvidersWithServices().subscribe({
      next: data => {
        this.providersWithServices = data.map(provider => ({
          ...provider,
          services: provider.services || [],
        }));
      },
      error: err => {
        console.error('Erreur lors de la récupération des providers:', err);
      },
    });

    this._cartService.cart$.subscribe(cart => {
      this.selectedServices = cart;
    });
  }

  addToCart(providerId: number, serviceId: number): void {
    const userId = providerId;
    const exists = this.selectedServices.some(item => item.userId === userId && item.provisionId === serviceId);

    if (!exists) {
      const item = { userId, provisionId: serviceId };
      this.selectedServices.push(item);
      this._cartService.addToCart(item);
      console.log('Ajouté au panier :', item);
    }
  }

  clearCart(): void {
    this._cartService.clearCart();
    this.selectedServices = [];
    console.log('Panier vidé');
  }
  removeFromCart(providerId: number, provisionId: number): void {
    this._cartService.removeFromCart(providerId, provisionId);
    console.log(`Supprimé du panier: Provider ID = ${providerId}, Service ID = ${provisionId}`);
  }
}
