import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductForCreation } from '../models/productCreation';

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

  setAll$(provisions: AppProvider[]): Observable<AppProvider[]> {
    this._provisions$.next(provisions);
    return this._provisions$.asObservable();
  }

  getAll$(): Observable<AppProvider[]> {
    return this._provisions$.asObservable();
  }

  add$(product: ProductForCreation): Observable<AppProvider[]> {
    this._products$.next([...this._products$.value, product]);
    return this._provisions$.asObservable();
  }
}
