import { Injectable } from '@angular/core';
import { ProvisionCartItem } from '../models/ProvisionCartItem';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProviderWithServicesDTO } from '../models/ProviderWithServicesDTO';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _providersUrl = 'http://localhost:8080/users/providers-with-services';  


  private _cartItems: ProvisionCartItem[] = [];
  providersWithServices: ProviderWithServicesDTO[] = [];

  constructor(private _http: HttpClient) {}

  getProvidersWithServices(): Observable<ProviderWithServicesDTO[]> {
    return this._http.get<ProviderWithServicesDTO[]>(this._providersUrl);
  }

  addToCart(item: ProvisionCartItem): void {
    this._cartItems.push(item);
  }

  getCartItems(): ProvisionCartItem[] {
    return this._cartItems;
  }

  clearCart(): void {
    this._cartItems = [];
  }

  // submitCart(): Observable<any> {
  //   return this._http.post(`${this._apiUrl}/submit`, this._cartItems);
  // }
  removeFromCart(providerId: number, provisionId: number): void {
    this._cartItems = this._cartItems.filter(item => item.userId !== providerId || item.provisionId !== provisionId);
  }
}