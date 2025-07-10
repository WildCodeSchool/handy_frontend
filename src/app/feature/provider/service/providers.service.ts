import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProviderWithServicesDTO } from '../../cart/models/ProviderWithServicesDTO';
import { HttpClient } from '@angular/common/http';
import { ProvisionDto } from '../../product/models/provisionDto';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProvidersService {
  // private _providersUrl = 'http://localhost:8080/users/providers-with-services';
  // private _providersservicesUrl = 'http://localhost:8080/provision-users/create-service';
  // private readonly _apiUrl = `${environment.}/users`;

  private readonly _providersUrl = `${environment.apiUrl}/users/providers-with-services`;
  private readonly _providersservicesUrl = `${environment.apiUrl}/provision-users/create-service`;
  private _http = inject(HttpClient);

  getProviderWithServices(id: number): Observable<ProviderWithServicesDTO> {
    return this._http.get<ProviderWithServicesDTO>(`${this._providersUrl}/${id}`);
  }
  attachServiceToConnectedProvider(dto: ProvisionDto[]): Observable<any> {
    return this._http.post(`${this._providersservicesUrl}`, dto);
  }
}
