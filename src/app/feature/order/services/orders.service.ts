import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Orders } from '../models/Orders';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private readonly _apiUrl = `${environment.apiUrl}/orders/self`;

  private _http = inject(HttpClient);

  getMyOrders(): Observable<Orders[]> {
    return this._http.get<Orders[]>(this._apiUrl);
  }
}
