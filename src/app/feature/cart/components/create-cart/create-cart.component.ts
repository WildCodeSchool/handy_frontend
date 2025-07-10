import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ProvisionCartItem } from '../../models/ProvisionCartItem';
import { CartService } from '../../services/cart.service';
import { CommonModule, NgClass } from '@angular/common';
import { AppProvider } from 'src/app/feature/product/models/provider';
import { Availability } from 'src/app/feature/availability/models/Availability';
import { AvailabilityService } from 'src/app/feature/availability/services/availability.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { catchError, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ProviderWithServicesDTO } from '../../models/ProviderWithServicesDTO';

@Component({
  selector: 'app-create-cart',
  standalone: true,
  imports: [NgClass, CommonModule, FormsModule, ToastrModule],
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

  private _cartService = inject(CartService);
  private _availabilityService = inject(AvailabilityService);
  private _authService = inject(AuthService);
  private _destroyRef = inject(DestroyRef);
  private readonly _toastr = inject(ToastrService);

  confirmationMessage$ = this._cartService.confirmationMessage$;

  ngOnInit(): void {
    this._initializeEmailClient();
    this._initializeCartState();
    this._subscribeToServiceMaps();
  }

  private _initializeEmailClient(): void {
    this.emailClient = this._authService.getCurrentUserEmail()!;
  }

  private _initializeCartState(): void {
    this._cartService
      .initCartState()
      .pipe(
        tap(cart => {
          this.cart = cart;
          this._fetchAvailability(cart.map(item => item.userId));
        }),
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe();
  }

  private _subscribeToServiceMaps(): void {
    this._cartService.serviceMap$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(map => (this.serviceMap = map));

    this._cartService.providerMap$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(map => (this.providerMap = map));
  }

  private _fetchAvailability(userIds: number[]): void {
    userIds.forEach(userId => {
      if (!this.providerAvailabilities[userId]) {
        this._availabilityService
          .getAvailabilityByProviderId(userId)
          .pipe(
            tap(availabilities => this._processAvailability(userId, availabilities)),
            catchError(() => {
              this._toastr.error(`Erreur lors du chargement des créneaux du fournisseur ${userId}`);
              return [];
            }),
            takeUntilDestroyed(this._destroyRef)
          )
          .subscribe();
      }
    });
  }

  private _processAvailability(userId: number, availabilities: Availability[]): void {
    this.providerAvailabilities[userId] = availabilities.filter(slot => slot.status === 'available');

    availabilities.filter(slot => slot.status === 'booked').forEach(slot => this._toastr.info(`Créneau réservé par : ${slot.bookedByEmail}`, 'Info'));
  }

  getTotalCoefficient(): number {
    return this.cart.reduce((total, item) => {
      const key = `${item.userId}_${item.provisionId}`;
      const service = this.serviceMap[key];
      return total + (service?.coeff || 0);
    }, 0);
  }

  showToast(message: string, type: 'success' | 'error'): void {
    this._toastr[type](message);
  }

  removeFromCart(providerId: number, provisionId: number): void {
    this._cartService.removeFromCart(providerId, provisionId);
  }

  clearCart(): void {
    this._cartService.clearCart();
  }

  submitCart(): void {
    this._cartService
      .submitCart()
      .pipe(
        tap(order => {
          this.orderNumber = order.orderNumber;
          this.clearCart();
          this.showToast(`Commande envoyée avec succès ✅ (N°: ${this.orderNumber})`, 'success');
        }),
        catchError(() => {
          this.showToast('Une erreur est survenue ❌', 'error');
          return [];
        }),
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe();
  }

  confirmAvailability(userId: number, provisionId: number): void {
    const key = `${userId}_${provisionId}`;
    const selected = this.selectedSlots[key];
    if (!selected) return;

    const updatedAvailability: Availability = {
      ...selected,
      status: 'booked',
    };

    this._availabilityService
      .updateAvailability(updatedAvailability)
      .pipe(
        tap(() => {
          selected.status = 'booked';
          this.providerAvailabilities[userId] = this.providerAvailabilities[userId].filter(a => a.status === 'available');
          this.confirmedSlots[key] = true;
          this.showToast('Créneau réservé avec succès ✅', 'success');
        }),
        catchError(() => {
          this.showToast('Une erreur est survenue lors de la réservation ❌', 'error');
          return [];
        }),
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe();
  }

  allSlotsConfirmed(): boolean {
    return this.cart.every(item => this.confirmedSlots[`${item.userId}_${item.provisionId}`]);
  }
}
