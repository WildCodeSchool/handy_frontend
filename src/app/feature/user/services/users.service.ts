import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfil } from '../models/UserProfil';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly _apiUrl = `${environment.apiUrl}/users`;

  private _http = inject(HttpClient);

  getUserProfile(): Observable<UserProfil> {
    return this._http.get<UserProfil>(`${this._apiUrl}/me`);
  }

  updateUserProfile(userProfile: UserProfil): Observable<UserProfil> {
    return this._http.put<UserProfil>(`${this._apiUrl}/update`, userProfile);
  }

  updateUserByAdmin(userId: number, data: UserProfil): Observable<UserProfil> {
    return this._http.put<UserProfil>(`${this._apiUrl}/update/${userId}`, data);
  }
  getAllUsers(): Observable<UserProfil[]> {
    return this._http.get<UserProfil[]>(`${this._apiUrl}`);
  }
  deleteUser(userId: number): Observable<void> {
    return this._http.delete<void>(`${this._apiUrl}/${userId}`);
  }
}
