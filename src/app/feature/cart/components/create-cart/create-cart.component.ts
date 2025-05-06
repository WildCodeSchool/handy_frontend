import { Component, OnInit } from '@angular/core';
import { ProvisionCartItem } from '../../models/ProvisionCartItem';
import { CartService } from '../../services/cart.service';
import { CommonModule, NgClass } from '@angular/common';
import { ProviderWithServicesDTO } from '../order-cart/order-cart.component';
import { AppProvider } from 'src/app/feature/product/models/provider';
import { Availability } from 'src/app/feature/availability/models/Availability';
import { AvailabilityService } from 'src/app/feature/availability/services/availability.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-cart',
  standalone: true,
  imports: [NgClass, CommonModule, FormsModule],
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

  constructor(
    private _cartService: CartService,
    private _availabilityService: AvailabilityService
  ) {}

  ngOnInit(): void {
    this._cartService.getProvidersWithServices().subscribe({
      next: data => {
        this.providersWithServices = data.map(p => ({ ...p, services: p.services || [] }));
        this.providerMap = Object.fromEntries(this.providersWithServices.map(p => [p.providerId, p]));

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
        const availableSlots = availabilities.filter(slot => slot.status === 'available');
        console.log('Dispos disponibles pour', userId, availableSlots);
        this.providerAvailabilities[userId] = availableSlots;
      },
      error: err => {
        console.error(`Erreur en récupérant les disponibilités du provider ${userId}`, err);
      },
    });
  }
  onSelectAvailability(userId: number): void {
    const selected = this.selectedSlots[userId];
  
    if (!selected) {
      return;
    }
    const updatedAvailability: Availability = {
      ...selected,
      status: 'booked',
    };
  
    this._availabilityService.updateAvailability(updatedAvailability).subscribe({
      next: () => {
        selected.status = 'booked';
        this.providerAvailabilities[userId] = this.providerAvailabilities[userId].filter(a => a.status === 'available');
        delete this.selectedSlots[userId];  
      },
      error: err => {
        console.error('Erreur lors de la mise à jour', err);
      },
    });
  
  
  
  }  trackByProvisionId(index: number, item: ProvisionCartItem): number {
    return item.provisionId;
  }

  confirmAvailability(userId: number): void {
    const selected = this.selectedSlots[userId];
    if (!selected) return;
  
    const updatedAvailability: Availability = {
      ...selected,
      status: 'booked',
    };
  
    this._availabilityService.updateAvailability(updatedAvailability).subscribe({
      next: () => {
        selected.status = 'booked';
  
        this.providerAvailabilities[userId] = this.providerAvailabilities[userId].filter(
          a => a.status === 'available'
        );
  
        delete this.selectedSlots[userId];
  
        this.showToast('Créneau réservé avec succès ✅', 'success');
      },
      error: err => {
        console.error('Erreur lors de la mise à jour de la disponibilité', err);
        this.showToast('Erreur lors de la réservation ❌', 'error');
      },
    });
  }
}
