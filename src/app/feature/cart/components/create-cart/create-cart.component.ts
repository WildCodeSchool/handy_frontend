import { Component, OnInit } from '@angular/core';
import { ProvisionCartItem } from '../../models/ProvisionCartItem';
import { CartService } from '../../services/cart.service';
import { CommonModule, NgClass } from '@angular/common';
import { ProviderWithServicesDTO } from '../order-cart/order-cart.component';
import { AppProvider } from 'src/app/feature/product/models/provider';
import { Availability } from 'src/app/feature/availability/models/Availability';
import { AvailabilityService } from 'src/app/feature/availability/services/availability.service';

@Component({
  selector: 'app-create-cart',
  standalone: true,
  imports: [NgClass, CommonModule],
  templateUrl: './create-cart.component.html',
  styleUrl: './create-cart.component.scss',
})
export class CreateCartComponent implements OnInit {
  cart: ProvisionCartItem[] = [];
  toastMessage: string = '';
  toastType: 'success' | 'error' | '' = '';
  providersWithServices: ProviderWithServicesDTO[] = [];
  providerAvailabilities: Record<number, Availability[]> = {};
  selectedSlots: Record<number, Availability> = {};
  providerMap: Record<number, ProviderWithServicesDTO> = {};
serviceMap: Record<string, AppProvider> = {};


  constructor(private _cartService: CartService,
    private _availabilityService: AvailabilityService

  ) {}

  // ngOnInit(): void {
  //   this._cartService.getProvidersWithServices().subscribe({
  //     next: data => {
  //       this.providersWithServices = data.map(provider => ({
  //         ...provider,
  //         services: provider.services || [],
  //       }));
  //       this.providersWithServices.forEach(provider => {
  //         this.loadAvailabilityForProvider(provider.providerId);
  //       });
  //     },
  //     error: err => {
  //       console.error('Erreur lors de la récupération des providers:', err);
  //     },
  //   });

  //   this._cartService.cart$.subscribe(cart => {
  //     this.cart = cart;
  //   });
  // }

  ngOnInit(): void {
    this._cartService.getProvidersWithServices().subscribe({
      next: data => {
        this.providersWithServices = data.map(p => ({ ...p, services: p.services || [] }));
        this.providerMap = Object.fromEntries(
          this.providersWithServices.map(p => [p.providerId, p])
        );
  
        this._cartService.cart$.subscribe(cart => {
          this.cart = cart;
  
          cart.forEach(item => {
            const provider = this.providerMap[item.userId];
            const service = provider?.services.find(s => s.id === item.provisionId);
            if (service) {
              this.serviceMap[`${item.userId}_${item.provisionId}`] = service;
            }
          });
  
          const uniqueUserIds = [...new Set(cart.map(item => item.userId))];
          uniqueUserIds.forEach(providerId => {
            this.loadAvailabilityForProvider(providerId);
          });
        });
      },
      error: err => console.error('Erreur lors de la récupération des providers:', err),
    });
  }
  
  showToast(message: string, type: 'success' | 'error'): void {
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
      next: response => {
        console.log('Commande envoyée avec succès ✅', response);
        alert('Commande envoyée !');
        this.clearCart();
      },
      error: error => {
        console.error('Erreur lors de la commande ❌', error);
        alert('Une erreur est survenue');
      },
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

  loadAvailabilityForProvider(userId: number): void {
    if (this.providerAvailabilities[userId]) {
      return;
    }
  
    this._availabilityService.getAvailabilityByProviderId(userId).subscribe({
      next: availabilities => {
        console.log('Dispos chargées pour', userId, availabilities);
        this.providerAvailabilities[userId] = availabilities;
      },
      error: err => {
        console.error(`Erreur en récupérant les disponibilités du provider ${userId}`, err);
      }
    });
  }
  onSelectAvailability(userId: number, event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const slotId = Number(selectElement.value);
    const availabilities = this.providerAvailabilities[userId];
    const selected = availabilities.find(slot => slot.id === slotId);
    if (selected) {
      this.selectedSlots[userId] = selected;
    }
  }
  trackByProvisionId(index: number, item: ProvisionCartItem): number {
    return item.provisionId;
  }
 
}
