import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppProvider } from './provider-store.service';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private _BASE_API_URL = `${environment.apiUrl}/provisions`;

  constructor(private _http: HttpClient) {}
  getAllProvisions$(): Observable<AppProvider[]> {
    return this._http.get<AppProvider[]>(this._BASE_API_URL);
  }

  getProvisionById$(id: string): Observable<AppProvider> {
    const url = `${this._BASE_API_URL}/${id}`;

    return this._http.get<AppProvider>(url);
  }

  updateProvision$(id: number, provision: AppProvider): Observable<AppProvider> {
    const url = `${this._BASE_API_URL}/${id}`;

    return this._http.put<AppProvider>(url, provision);
  }
  searchProvisions$(keyword: string): Observable<AppProvider[]> {
    const url = `${this._BASE_API_URL}/search?keyword=${encodeURIComponent(keyword)}`;

    return this._http.get<AppProvider[]>(url);
  }
}
