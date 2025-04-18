import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import { TokenService } from './token.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserStoreService } from './user-store.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

type Role = {
  authority: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _userPayload: any;
  private _authStatus$!: BehaviorSubject<boolean>;
  private readonly _apiBaseUrl = environment.apiUrl;

  constructor(
    private _http: HttpClient,
    private _tokenService: TokenService,
    private _userStore: UserStoreService,
    private _router: Router
  ) {
    this._authStatus$ = new BehaviorSubject<boolean>(this._tokenService.isLogged());
    this._userPayload = this._decodeToken();
    console.log('User Payload après décode :', this._userPayload);
  }

  public register$(email: string, password: string): Observable<boolean> {
    return this._http.post<boolean>(`${this._apiBaseUrl}/auth/register`, { email, password });
  }

  public login$(email: string, password: string): Observable<string> {
    return this._http.post<{ token: string }>(`${this._apiBaseUrl}/auth/login`, { email, password }).pipe(
      tap(res => {
        this.saveToken(res.token);
        this.storeToken(res.token);
        console.log('token stored');
        this._userStore.initializeRoles();
        this._authStatus$.next(true);

        console.log('les roles');
        const roles = this.getRoleFromToken();

        if (roles.includes('ROLE_PROVIDER')) {
          this._router.navigate(['/providers']);
        } else if (roles.includes('ROLE_ADMIN')) {
          this._router.navigate(['/admin']);
        } else {
          this._router.navigate(['/']);
        }
      }),
      map(res => res.token)
    );
  }
  get authStatus$(): Observable<boolean> {
    return this._authStatus$.asObservable();
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
    this._authStatus$.next(false);
    this._userStore.clearRoles();
    this._router.navigate(['/']);
  }

  private _decodeToken(): unknown {
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
    if (this._userPayload && this._userPayload.roles) {
      return this._userPayload.roles.map((role: Role) => role.authority);
    }
    return [];
  }

}
