import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppProvider } from './provider-store.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private _BASE_API_URL: string = 'http://localhost:8080/provisions';

  constructor(private _http: HttpClient) {}
  getAllProvisions$(): Observable<AppProvider[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this._http.get<AppProvider[]>(this._BASE_API_URL, {
      headers,
      withCredentials: true,
    });
  }

  getProvisionById$(id: string): Observable<AppProvider> {
    const url = `${this._BASE_API_URL}/${id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this._http.get<AppProvider>(url, {
      headers,
      withCredentials: true,
    });
  }

  updateProvision$(id: number, provision: AppProvider): Observable<AppProvider> {
    const url = `${this._BASE_API_URL}/${id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this._http.put<AppProvider>(url, provision, { headers, withCredentials: true });
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
