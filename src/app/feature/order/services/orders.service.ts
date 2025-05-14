import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Orders } from '../models/Orders';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService  {
  private readonly _apiUrl = 'http://localhost:8080/orders/me';

  constructor(private _http: HttpClient) {}

  getMyOrders(): Observable<Orders[]> {
    return this._http.get<Orders[]>(this._apiUrl);
  }
}
