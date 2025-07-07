import { inject, Injectable } from '@angular/core';
import { ProvisionCartItem } from '../models/ProvisionCartItem';
import { BehaviorSubject, Observable, Subject, switchMap, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProviderWithServicesDTO } from '../models/ProviderWithServicesDTO';
import { AuthService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _providersUrl = `${environment.apiUrl}/users/providers-with-services`;
  private _submitUrl = `${environment.apiUrl}/provision-users/batch`;

  private _cartItems: ProvisionCartItem[] = [];
  private _cartSubject = new BehaviorSubject<ProvisionCartItem[]>([]);
  cart$ = this._cartSubject.asObservable();

  providersWithServices: ProviderWithServicesDTO[] = [];
  confirmationMessage$ = new Subject<string>();

  _providerMap = new BehaviorSubject<Record<number, ProviderWithServicesDTO>>({});
  serviceMapSync: Record<string, any> = {};

  private _serviceMap = new BehaviorSubject<Record<string, any>>({});
  providerMap$ = this._providerMap.asObservable();
  serviceMap$ = this._serviceMap.asObservable();

  private readonly _http = inject(HttpClient);
  private readonly _authService = inject(AuthService);

  getProvidersWithServices(): Observable<ProviderWithServicesDTO[]> {
    return this._http.get<ProviderWithServicesDTO[]>(this._providersUrl);
  }

  addToCart(item: ProvisionCartItem): void {
    const exists = this._cartItems.some(existingItem => existingItem.userId === item.userId && existingItem.provisionId === item.provisionId);

    if (!exists) {
      this._cartItems.push(item);
      this._cartSubject.next(this._cartItems);
    }
  }

  getCartItems(): ProvisionCartItem[] {
    return [...this._cartItems];
  }

  clearCart(): void {
    this._cartItems = [];
    this._cartSubject.next(this._cartItems);
  }

  removeFromCart(providerId: number, provisionId: number): void {
    this._cartItems = this._cartItems.filter(item => item.userId !== providerId || item.provisionId !== provisionId);
    this._cartSubject.next(this._cartItems);
  }

  submitCart(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this._http.post(this._submitUrl, this._cartItems, { headers }).pipe(
      tap(() => {
        this.confirmationMessage$.next('✅ Votre commande a été envoyée avec succès.');
        this.clearCart();
      })
    );
  }

  initCartState(): Observable<ProvisionCartItem[]> {
    return this.getProvidersWithServices().pipe(
      tap(providers => {
        this.providersWithServices = providers.map(p => ({ ...p, services: p.services || [] }));
        const mapObj = Object.fromEntries(this.providersWithServices.map(p => [p.providerId, p]));
        this._providerMap.next(mapObj);
      }),
      switchMap(() => this.cart$),
      tap(cart => {
        const serviceMap: Record<string, any> = {};

        const providerMap = this._providerMap.getValue();
        cart.forEach(item => {
          const provider = providerMap[item.userId];
          const service = provider?.services.find(s => s.id === item.provisionId);
          if (service) {
            serviceMap[`${item.userId}_${item.provisionId}`] = service;
          }
        });
        this._serviceMap.next(serviceMap);
        this.serviceMapSync = serviceMap;
      })
    );
  }
 
}
