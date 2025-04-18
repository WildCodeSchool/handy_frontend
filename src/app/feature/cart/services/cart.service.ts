import { Injectable } from '@angular/core';
import { ProvisionCartItem } from '../models/ProvisionCartItem';
import { BehaviorSubject,  catchError,  Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProviderWithServicesDTO } from '../models/ProviderWithServicesDTO';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  
  private _providersUrl = 'http://localhost:8080/users/providers-with-services';
  private _submitUrl = 'http://localhost:8080/provision-users';
  


  private _cartItems: ProvisionCartItem[] = [];
  providersWithServices: ProviderWithServicesDTO[] = [];
  private _cartSubject = new BehaviorSubject<ProvisionCartItem[]>([]);
  cart$ = this._cartSubject.asObservable();

  constructor(private _http: HttpClient) {}

  getProvidersWithServices(): Observable<ProviderWithServicesDTO[]> {
    return this._http.get<ProviderWithServicesDTO[]>(this._providersUrl);
  }

  addToCart(item: ProvisionCartItem): void {
    const exists = this._cartItems.some(
      existingItem =>
        existingItem.userId === item.userId &&
        existingItem.provisionId === item.provisionId
    );
  
    if (!exists) {
      this._cartItems.push(item);
      this._cartSubject.next(this._cartItems);
      console.log('[🛒 Ajouté]', item);
    } else {
      console.log('[⚠️ Déjà présent dans le panier]', item);
    }
  }

  getCartItems(): ProvisionCartItem[] {
    return this._cartItems;
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
    console.log('Données envoyées au serveur:', this._cartItems);
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    console.log('[✅ Envoi] Données envoyées :', this._cartItems);
  
    const batchUrl = 'http://localhost:8080/provision-users/batch'; 
    return this._http.post(batchUrl, this._cartItems, { headers }).pipe(
      catchError(error => {
        console.error('Erreur de soumission du panier :', error);
        return throwError(() => new Error('Erreur lors de la soumission du panier'));
      })
    );
  }
  

//   submitCart(): Observable<any> {
//     if (this._cartItems.length === 0) {
//       throw new Error("Panier vide");
//     }
  
//     const cartItem = this._cartItems[0];
  
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json', 
      
//     });
  
//     console.log('[✅ Envoi] Données envoyées :', cartItem);
  
//     return this._http.post(this._submitUrl, cartItem, { headers }).pipe(
//       catchError(error => {
//         console.error('Erreur de soumission du panier :', error);
//         return throwError(() => new Error('Erreur lors de la soumission du panier'));
//       })
//     );
//   }
}
