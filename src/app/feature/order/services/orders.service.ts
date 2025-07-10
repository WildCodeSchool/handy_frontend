import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Orders } from '../models/Orders';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  // private readonly _apiUrl = 'http://localhost:8080/orders/me';
  private readonly _apiUrl = `${environment.apiUrl}/orders/me`;

  private _http = inject(HttpClient);

  getMyOrders(): Observable<Orders[]> {
    return this._http.get<Orders[]>(this._apiUrl);
  }
}
