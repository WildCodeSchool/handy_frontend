import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { TokenService } from './token.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserStoreService } from './user-store.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _userPayload: any;

  constructor(
    private _http: HttpClient,
    private _tokenService: TokenService,
    private _userStore: UserStoreService
  ) {
    this._userPayload = this._decodeToken();
  }

  public register$(email: string, password: string): Observable<boolean> {
    return this._http.post<boolean>('http://localhost:8080/auth/register', { email, password });
  }

  //public login$(email: string, password: string): Observable<string> {
  //return this._http.post<string>('http://localhost:8080/auth/login', { email, password },).pipe(
  //tap((token: string) => this.saveToken(token))
  //);

  public login$(email: string, password: string): Observable<string> {
    return this._http.post<{ token: string }>('http://localhost:8080/auth/login', { email, password }).pipe(
      tap(res => this.saveToken(res.token)),
      map(res => res.token)
    );
  }

  public saveToken(token: string): void {
    localStorage.setItem('token', token);
  }
  storeToken(token: string): void {
    this._tokenService.setToken(token);
    this._userPayload = this._decodeToken();
  }

  isLoggedIn(): boolean {
    return this._tokenService.isLogged();
  }

  isLoggedInObservable(): Observable<boolean> {
    const isLoggedIn = this.isLoggedIn();
    return of(isLoggedIn);
  }

  logout(): void {
    this._tokenService.clearToken();
    this._userPayload = null;
  }

  private _decodeToken(): any {
    const token = this._tokenService.getToken();
    if (!token) return null;

    const jwtHelper = new JwtHelperService();
    try {
      const decodedToken = jwtHelper.decodeToken(token);
      console.log('Token décodé:', decodedToken);
      return decodedToken;
    } catch (error) {
      console.error('Erreur de décodage du token:', error);
      return null;
    }
  }

  getRoleFromToken(): string[] {
    if (this._userPayload) {
      return this._userPayload.roles || [];
    }
    return [];
  }

  setUserDetailsInStore(): void {
    const roles = this.getRoleFromToken();
    console.log('Rôles extraits du token:', roles);
    this._userStore.setRolesFromStore(roles);
  }

  // l'ID de l'utilisateur à partir du token **
  getUserIdFromToken(): string | null {
    return this._userPayload?.sub || null;
  }
}
