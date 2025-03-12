import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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
}
