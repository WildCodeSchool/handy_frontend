import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import { TokenService } from './token.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserStoreService } from './user-store.service';
import { Router } from '@angular/router';

type Role = {
  authority: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _userPayload: any;
  private _authStatus$!: BehaviorSubject<boolean>;
  private _logoutMessage$ = new BehaviorSubject<string | null>(null);
  public logoutMessage$ = this._logoutMessage$.asObservable();

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
    return this._http.post<boolean>('http://localhost:8080/auth/register', { email, password });
  }

  //public login$(email: string, password: string): Observable<string> {
  //return this._http.post<string>('http://localhost:8080/auth/login', { email, password },).pipe(
  //tap((token: string) => this.saveToken(token))
  //);

  //public login$(email: string, password: string): Observable<string> {
  //return this._http.post<{ token: string }>('http://localhost:8080/auth/login', { email, password }).pipe(
  //tap(res => this.saveToken(res.token)),
  //map(res => res.token)

  //);
  //}
  public login$(email: string, password: string): Observable<string> {
    return this._http.post<{ token: string }>('http://localhost:8080/auth/login', { email, password }).pipe(
      tap(res => {
        this.saveToken(res.token); // Stocke dans localStorage
        this.storeToken(res.token); // Stocke dans TokenService + décode
        console.log('token stored');
        //this.setUserDetailsInStore();  // Injecte les rôles dans le store
        this._userStore.initializeRoles();
        this._authStatus$.next(true);

        console.log('les roles');
        const roles = this.getRoleFromToken();

        if (roles.includes('ROLE_PROVIDER')) {
          this._router.navigate(['/providers']);
        } else if (roles.includes('ROLE_ADMIN')) {
          this._router.navigate(['/products']);
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
    // console.log('User Payload après décode :', this._userPayload);
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
    this._logoutMessage$.next('Vous avez été déconnecté(e).');
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

  // getRoleFromToken(): string[] {
  //   console.log('Décodage du token, _userPayload:', this._userPayload);
  //   if (this._userPayload ) {
  //     console.log('Rôles dans le payload:', this._userPayload.roles);
  //     return this._userPayload.roles || [];
  //   }
  //   console.log('Aucun payload trouvé, retour d\'un tableau vide');

  //   return [];
  // }

  getRoleFromToken(): string[] {
    if (this._userPayload && this._userPayload.roles) {
      return this._userPayload.roles.map((role: Role) => role.authority);
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
