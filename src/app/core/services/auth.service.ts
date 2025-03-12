import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TokenService } from './token.service';
import { UserStoreService } from './user-store.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userPayload: any;
  constructor(
    private _http: HttpClient,
    private _tokenService: TokenService,
    private _userStore: UserStoreService
  ) {
    this._userPayload = this.decodeToken();
  }
  login(email: string, password: string): Observable<any> {
    return this._http.post('http://localhost:8000/auth/login', {
      username: email,
      password: password,
    });
  }
  storeToken(token: string): void {
    this._tokenService.setToken(token);
  }
  // Note vérifier si l'utilisateur est connecté à travers l'existance de token
  isLoggedIn(): boolean {
    return this._tokenService.isLogged();
  }

  isLoggedInObservable(): Observable<boolean> {
    const isLoggedIn = this.isLoggedIn();
    return of(isLoggedIn);
  }

  logout(): void {
    this._tokenService.clearToken();
  }

   // Import JwtHelperService from '@auth0/angular-jwt'

  // ... previous code remains the same

  decodeToken(): any {
    const jwtHelper = new JwtHelperService(); // Create an instance of JwtHelperService
    const token = this._tokenService.getToken()!;
    const decodedToken = jwtHelper.decodeToken(token);
    console.log('Token décodé:', decodedToken);
    return jwtHelper.decodeToken(token);
  }


  getRoleFromToken(): any {
    const userPayload = this.decodeToken();
    return userPayload?.roles || [];
  }

  setUserDetailsInStore():void {
    const roles = this.getRoleFromToken();
    console.log('Rôles extraits du token:', roles);
    this._userStore.setRolesFromStore(roles);
  }

  getUserIdFromToken():any {
    const userPayload = this.decodeToken();
    return userPayload?.user_id; // Assurez-vous que votre token contient l'ID de l'utilisateur sous la clé 'user_id'
  }
}
