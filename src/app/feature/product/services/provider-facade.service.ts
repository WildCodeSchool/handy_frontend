import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ProviderStoreService } from './provider-store.service';
import { Observable, switchMap, tap } from 'rxjs';
import { AppProvider } from '../models/provider';
import { ProductForCreation } from '../models/productCreation';

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
  // post$(product: AppProvider):any {
  //   this._api.createProvision$(product).pipe(
  //     tap((product: AppProvider) => this._store.add$(product),)
  //   )
  //   .subscribe();
  // }
  post$(product: ProductForCreation): any {
    console.log('Envoi des données au serveur:', product);
    return this._api.createProvision$(product).pipe(
      tap((product: ProductForCreation) => {
        console.log('Réponse du serveur:', product); // Réponse obtenue
        this._store.add$(product); // Ajoute le produit dans le store si nécessaire
      })
    );
  }
}
