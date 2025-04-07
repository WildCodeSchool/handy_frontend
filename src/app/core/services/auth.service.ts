import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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

  // Simuler une connexion avec un token fictif
  // login(email: string, password: string): Observable<any> {
  //   const mockResponse = {
  //     token:
  //       'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pNzc3QGV4YW1wbGUuY29tIiwicm9sZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfUFJFU1RBVEFJUkUifV0sImlhdCI6MTc0MTc4MTYyNiwiZXhwIjoxNzQxNzg1MjI2fQ.b6uwvV4YT0QWI8nYQX8J-sxSgMCY1HA2gX2C9Mgq1vM',
  //     user: {
  //       id: 1,
  //       email: 'admi777@example.com',
  //       password: 'tpassword123',
  //       roles: ['PRESTATAIRE'],
  //     },
  //   };
  //   console.log(`Fictive login attempt with email: ${email} ${password}`);
  //   return of(mockResponse); // Retourne un Observable avec des données fictives
  // }
  //   login$(email: string, password: string): Observable<string> {
  //     return this._http.post<string>('eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0aG9tYXNAZXhhbXBsZS5jb20iLCJyb2xlcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9QUkVTVEFUQUlSRSJ9XSwiaWF0IjoxNzQxNzg2ODkzLCJleHAiOjE3NDE3OTA0OTN9.yn4913Lq8EOfhO-TPTHpp2KKFhpGFbdHPbSlZjpv1ng',{ email, password }).pipe(
  //       tap((token: string) => this.saveToken(token))
  //        );

  // }

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

  // Obtenir l'ID de l'utilisateur à partir du token
  getUserIdFromToken(): string | null {
    return this._userPayload?.sub || null; // Utiliser 'sub' ou le champ approprié
  }
}
// import { HttpClient } from '@angular/common/http';
// import { inject, Injectable } from '@angular/core';
// import { Observable, of, tap } from 'rxjs';

// @Injectable({

//   providedIn: 'root'
// })
// export class AuthApiService {

//   private _http: HttpClient = inject(HttpClient);

//   constructor() { }

//   public register$(email: string, password: string): Observable<boolean> {
//     return this._http.post<boolean>('/api/auth/register', { email, password });
//   }

//   public login$(email: string, password: string): Observable<string> {
//     // Méthode POST "classique" pour se connecter
//     // return this._http.post<string>('/api/auth/login', { email, password }).pipe(
//     //   tap((token: string) => this.saveToken(token))
//     // );

//     // Pour cet atelier, on simplifie avec un token en dur
//     return of('eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pNzc3QGV4YW1wbGUuY29tIiwicm9sZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfUFJFU1RBVEFJUkUifV0sImlhdCI6MTc0MTc4MTYyNiwiZXhwIjoxNzQxNzg1MjI2fQ.b6uwvV4YT0QWI8nYQX8J-sxSgMCY1HA2gX2C9Mgq1vM').pipe(
//       tap((token: string) => this.saveToken(token))
//     );
//   }

//   public saveToken(token: string): void {
//     localStorage.setItem('token', token);
//   }

//   public getToken(): string {
//     if (localStorage.getItem('token')) {
//       return localStorage.getItem('token') as string;
//     }
//     throw new Error('Token not found');
//   }

//   public clearToken(): void {
//     localStorage.removeItem('token');
//   }

//   // "Vraie" méthode pour se connecter
//   isLoggedIn(): boolean {
//     const token = this.getToken();
//     if (!token) return false;
//     const decodedToken: any = jwtDecode(token);
//     const expiryDate = new Date(decodedToken.exp * 1000);
//     if (expiryDate < new Date()) {
//       this.clearToken();
//       return false;
//     }
//     return true;
//   }

//   // Méthode simplifiée pour cet atelier :
//   isLoggedInSimplified(): boolean {
//     if (localStorage.getItem('token')) {
//       return true;
//     }
//     return false;
//   }

//   getDecodedToken(): any {
//     const token = this.getToken();
//     if (!token) return null;
//     return jwtDecode(token);
//   }

//   getUserRole(): string | null {
//     const decodedToken = this.getDecodedToken();
//     return decodedToken ? decodedToken.role : null;
//   }

// }

// function jwtDecode(token: string): any {
//   throw new Error('Function not implemented.');
// }
