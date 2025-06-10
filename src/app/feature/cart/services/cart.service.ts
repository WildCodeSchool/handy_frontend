import { Injectable } from '@angular/core';
import { ProvisionCartItem } from '../models/ProvisionCartItem';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProviderWithServicesDTO } from '../models/ProviderWithServicesDTO';

@Injectable({
  providedIn: 'root',
})

export class CartService {
  private _providersUrl = 'http://localhost:8080/users/providers-with-services';
  private _submitUrl = 'http://localhost:8080/provision-users/batch';

  private _cartItems: ProvisionCartItem[] = [];
  private _cartSubject = new BehaviorSubject<ProvisionCartItem[]>([]);
  cart$ = this._cartSubject.asObservable();

  providersWithServices: ProviderWithServicesDTO[] = [];

  constructor(private _http: HttpClient) {}

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
        alert('✅ Votre commande a été envoyée avec succès.');
        this.clearCart();
      })
    );
  }
}
