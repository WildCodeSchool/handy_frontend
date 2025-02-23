import { Injectable } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { ProviderStoreService } from './provider-store.service';
import { Observable, switchMap, tap } from 'rxjs';
import { AppProvider } from './provider';

@Injectable({
  providedIn: 'root',
})
export class ProviderFacadeService {
  // private _api: ApiService = inject(ApiService);
  // private _store: ProviderStoreService = inject(ProviderStoreService);

  constructor(
    private _api: ApiService,
    private _store: ProviderStoreService
  ) {}

  getAll$(): Observable<AppProvider[]> {
    return this._api.getAllProvisions$().pipe(
      tap(provisions => console.log('Données reçues:', provisions)),
      switchMap(provisions => this._store.setAll$(provisions))
    );
  }
}
