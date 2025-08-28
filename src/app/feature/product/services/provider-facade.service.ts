import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ProviderStoreService } from './provider-store.service';
import { Observable, switchMap, tap } from 'rxjs';
import { AppProvider } from '../models/provider';
import { ProductForCreation } from '../models/productCreation';

@Injectable({
  providedIn: 'root',
})
export class ProviderFacadeService {
  private _api: ApiService = inject(ApiService);
  private _store: ProviderStoreService = inject(ProviderStoreService);

  getAll$(): Observable<AppProvider[]> {
    return this._api.getAllProvisions$().pipe(switchMap(provisions => this._store.setAll$(provisions)));
  }

  post$(product: ProductForCreation): any {
    return this._api.createProvision$(product).pipe(
      tap((product: ProductForCreation) => {
        this._store.add$(product);
      })
    );
  }
  searchProvisions$(keyword: string): Observable<AppProvider[]> {
    return this._api.searchProvisions$(keyword);
  }
}
