import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AppProvider } from '../models/provider';
import { ProductForCreation } from '../models/productCreation';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _BASE_API_URL = `${environment.apiUrl}/provisions`;

  constructor(private _http: HttpClient) {}
  getAllProvisions$(): Observable<AppProvider[]> {
    return this._http.get<AppProvider[]>(this._BASE_API_URL).pipe(
      tap(response => console.log('Réponse API:', response)),
      tap(() => console.log('Requête envoyée à:', this._BASE_API_URL))
    );
  }

  getProvisionById$(id: string): Observable<AppProvider> {
    const url = `${this._BASE_API_URL}/${id}`;

    return this._http.get<AppProvider>(url).pipe(
      tap(response => console.log('Réponse API pour un élément:', response)),
      tap(() => console.log(`Requête envoyée pour récupérer l'élément avec ID ${id}:`, url))
    );
  }

  updateProvision$(id: number, provision: AppProvider): Observable<AppProvider> {
    const url = `${this._BASE_API_URL}/${id}`;

    return this._http.put<AppProvider>(url, provision).pipe(
      tap(response => console.log('Réponse API après modification:', response)),
      tap(() => console.log(`Requête envoyée pour modifier l'élément avec ID ${id}:`, url))
    );
  }

  createProvision$(provision: ProductForCreation): Observable<ProductForCreation> {
    return this._http.post<ProductForCreation>(this._BASE_API_URL, provision);
  }

  deleteProvision$(id: number): Observable<void> {
    const url = `${this._BASE_API_URL}/${id}`;
    return this._http.delete<void>(url);
  }
  searchProvisions$(keyword: string): Observable<AppProvider[]> {
    const url = `${this._BASE_API_URL}/search?keyword=${encodeURIComponent(keyword)}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this._http.get<AppProvider[]>(url, {
      headers,
      withCredentials: true,
    });
  }
}
