import { Component, OnInit } from '@angular/core';
import { ProvisionCartItem } from '../../models/ProvisionCartItem';
import { CartService } from '../../services/cart.service';
import { CommonModule, NgClass } from '@angular/common';
import { ProviderWithServicesDTO } from '../order-cart/order-cart.component';
import { AppProvider } from 'src/app/feature/product/models/provider';
import { Availability } from 'src/app/feature/availability/models/Availability';
import { AvailabilityService } from 'src/app/feature/availability/services/availability.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

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
  emailClient: string = '';
  providersWithServices: ProviderWithServicesDTO[] = [];
  providerAvailabilities: Record<number, Availability[]> = {};
  selectedSlots: Record<string, Availability> = {};
  confirmedSlots: Record<string, boolean> = {};
  orderNumber: string | null = null;


  providerMap: Record<number, ProviderWithServicesDTO> = {};
  serviceMap: Record<string, AppProvider> = {};

  constructor(
    private _cartService: CartService,
    private _availabilityService: AvailabilityService,
    private _authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.emailClient = this._authService.getCurrentUserEmail()!;
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
        next: (order) => {
          console.log('Réponse de commande:', order);
          this.orderNumber = order.orderNumber;
        this.clearCart();
        this.showToast(`Commande envoyée avec succès ✅ (N°: ${this.orderNumber})`, 'success');
      },
      error: () => {
        this.showToast('Une erreur est survenue ❌', 'error');
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

        this.providerAvailabilities[userId] = availableSlots;

        const bookedSlots = availabilities.filter(slot => slot.status === 'booked');
        bookedSlots.forEach(slot => {
          console.log(`Créneau réservé par : ${slot.bookedByEmail}`);
        });
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
      bookedByEmail: this.emailClient,
    };

    this._availabilityService.updateAvailability(updatedAvailability).subscribe({
      next: () => {
        selected.status = 'booked';
        this.providerAvailabilities[userId] = this.providerAvailabilities[userId].filter(a => a.status === 'available');
        delete this.selectedSlots[userId];
      },
    });
  }
  trackByProvisionId(index: number, item: ProvisionCartItem): number {
    return item.provisionId;
  }

  confirmAvailability(userId: number, provisionId: number): void {
    const key = `${userId}_${provisionId}`;
    const selected = this.selectedSlots[key];
    if (!selected) return;

    const updatedAvailability: Availability = {
      ...selected,
      status: 'booked',
    };

    this._availabilityService.updateAvailability(updatedAvailability).subscribe({
      next: () => {
        selected.status = 'booked';

        this.providerAvailabilities[userId] = this.providerAvailabilities[userId].filter(a => a.status === 'available');
        this.confirmedSlots[key] = true;
        this.showToast('Créneau réservé avec succès ✅', 'success');
      },
      error: () => {
        this.showToast('Erreur lors de la réservation ❌', 'error');
      },
    });
  }
  allSlotsConfirmed(): boolean {
    return this.cart.every(item => {
      const key = `${item.userId}_${item.provisionId}`;
      return this.confirmedSlots[key];
    });
  }
}