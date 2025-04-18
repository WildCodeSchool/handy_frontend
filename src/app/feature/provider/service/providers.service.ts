import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProviderWithServicesDTO } from '../../cart/models/ProviderWithServicesDTO';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProvidersService {
  private _providersUrl = 'http://localhost:8080/users/providers-with-services';

  constructor(private _http: HttpClient) {}
  getProviderWithServices(id: number): Observable<ProviderWithServicesDTO> {
    return this._http.get<ProviderWithServicesDTO>(`${this._providersUrl}/${id}`);
  }
}
