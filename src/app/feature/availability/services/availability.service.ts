import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Availability } from '../models/Availability';

@Injectable({
  providedIn: 'root',
})
export class AvailabilityService {
  private _baseUrl = 'http://localhost:8080/availabilities';

constructor(private _http: HttpClient) {}

  getMyAvailability(): Observable<Availability[]> {
    return this._http.get<Availability[]>(`${this._baseUrl}/me`);
  }

  getAvailabilityByProviderId(userId: number): Observable<Availability[]> {
    return this._http.get<Availability[]>(`${this._baseUrl}/user/${userId}`);
  }

  updateAvailability(availability: Availability): Observable<any> {
    return this._http.put(`${this._baseUrl}/${availability.id}`, availability);
  }

  createMyAvailability(startTime: string, endTime: string): Observable<any> {
    return this._http.post(`${this._baseUrl}/me`, { startTime, endTime });
  }
}