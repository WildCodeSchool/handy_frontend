import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AppProvider } from '../components/provider/provider';

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
}
