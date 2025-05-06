import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Availability } from '../models/Availability';

@Injectable({
  providedIn: 'root',
})
export class AvailabilityService {
  private _baseUrl = 'http://localhost:8080/availabilities/me';

  constructor(private _http: HttpClient) {}

  getMyAvailability(): Observable<Availability> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this._http.get<Availability>(this._baseUrl, { headers });
  }

  getAvailabilityByProviderId(userId: number): Observable<Availability[]> {
    return this._http.get<Availability[]>(`http://localhost:8080/availabilities/user/${userId}`);
  }

  updateAvailability(availability: Availability): Observable<any> {
    return this._http.put(
      `http://localhost:8080/availabilities/${availability.id}`,
      availability
    );
  }
}
