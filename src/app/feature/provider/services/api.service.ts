import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AppProvider } from '../models/provider';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _BASE_API_URL: string = 'http://localhost:8080/provisions';

  constructor(private _http: HttpClient) {}
  getAllProvisions$(): Observable<AppProvider[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this._http
      .get<AppProvider[]>(this._BASE_API_URL, {
        headers,
        withCredentials: true,
      })
      .pipe(
        tap(response => console.log('Réponse API:', response)),
        tap(() => console.log('Requête envoyée à:', this._BASE_API_URL))
      );
  }

  getProvisionById$(id: string): Observable<AppProvider> {
    const url = `${this._BASE_API_URL}/${id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this._http
      .get<AppProvider>(url, {
        headers,
        withCredentials: true,
      })
      .pipe(
        tap(response => console.log('Réponse API pour un élément:', response)),
        tap(() => console.log(`Requête envoyée pour récupérer l'élément avec ID ${id}:`, url))
      );
  }

  updateProvision$(id: string, provision: AppProvider): Observable<AppProvider> {
    const url = `${this._BASE_API_URL}/${id}`; // Construction de l'URL avec l'ID
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this._http.put<AppProvider>(url, provision, { headers, withCredentials: true }).pipe(
      tap(response => console.log('Réponse API après modification:', response)),
      tap(() => console.log(`Requête envoyée pour modifier l'élément avec ID ${id}:`, url))
    );
  }
}
