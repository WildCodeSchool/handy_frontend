import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductForCreation } from '../models/productCreation';

// Le type Provider
export type AppProvider = {
  id: number;
  name: string;
  coeff: number;
};

@Injectable({
  providedIn: 'root',
})
export class ProviderStoreService {
  private _provisions$ = new BehaviorSubject<AppProvider[]>([]);
  private _products$ = new BehaviorSubject<ProductForCreation[]>([]);

  constructor() {
    // const savedProvisions = localStorage.getItem('providers');
    // if (savedProvisions) {
    //   this._provisions$.next(JSON.parse(savedProvisions));
    // }
  }

  setAll$(provisions: AppProvider[]): Observable<AppProvider[]> {
    this._provisions$.next(provisions);
    return this._provisions$.asObservable();
  }

  // Récupérer les provisions stockées
  getAll$(): Observable<AppProvider[]> {
    return this._provisions$.asObservable();
  }

  add$(product: ProductForCreation): Observable<AppProvider[]> {
    this._products$.next([...this._products$.value, product]); //j'extrais la valeur contenue dans Bahvir subject , le nouvel élément de mon tableau
    return this._provisions$.asObservable();
  }
}
