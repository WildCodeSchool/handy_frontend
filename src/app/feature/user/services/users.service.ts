import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfil } from '../models/UserProfil';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private _apiUrl = 'http://localhost:8080/users';

  constructor(private _http: HttpClient) {}

  getUserProfile(): Observable<UserProfil> {
    return this._http.get<UserProfil>(`${this._apiUrl}/me`);
  }

  updateUserProfile(userProfile: UserProfil): Observable<UserProfil> {
    return this._http.put<UserProfil>(`${this._apiUrl}/update`, userProfile);
  }
}
