import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TokenService } from './token.service';
// import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _userPayload: any;
  constructor(
    private _http: HttpClient,
    private _tokenService: TokenService
    // private _userStore: UserStoreService
  ) {
    // this._userPayload = this._decodeToken();
  }

  // Simuler une connexion avec un token fictif
  login(email: string, password: string): Observable<any> {
    const mockResponse = {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      user: {
        id: 1,
        email: 'test@example.com',
        password: 'testpassword',
        roles: ['USER', 'ADMIN'],
      },
    };
    console.log(`Fictive login attempt with email: ${email} ${password}`);
    return of(mockResponse); // Retourne un Observable avec des données fictives
  }

  // Stocker le token dans le TokenService
  storeToken(token: string): void {
    this._tokenService.setToken(token);
    // this._userPayload = this._decodeToken(); // Décode le token dès qu'il est stocké
  }

  // Vérifier si l'utilisateur est connecté (token présent)
  isLoggedIn(): boolean {
    return this._tokenService.isLogged();
  }

  // Retourne un Observable pour vérifier l'état de connexion
  isLoggedInObservable(): Observable<boolean> {
    const isLoggedIn = this.isLoggedIn();
    return of(isLoggedIn);
  }

  // Déconnexion de l'utilisateur (effacer le token)
  logout(): void {
    this._tokenService.clearToken();
    this._userPayload = null; // Effacer le payload lors de la déconnexion
  }

  // Décoder le token et stocker le résultat dans _userPayload
  // private _decodeToken(): any {
  //   const token = this._tokenService.getToken();
  //   if (!token) return null;

  //   const jwtHelper = new JwtHelperService();
  //   try {
  //     const decodedToken = jwtHelper.decodeToken(token);
  //     console.log('Token décodé:', decodedToken);
  //     return decodedToken;
  //   } catch (error) {
  //     console.error('Erreur de décodage du token:', error);
  //     return null;
  //   }
  // }

  // Obtenir les rôles à partir du token
  // getRoleFromToken(): string[] {
  //   if (this._userPayload) {
  //     return this._userPayload.roles || [];
  //   }
  //   return [];
  // }

  // Mettre à jour les rôles de l'utilisateur dans le UserStore
  // setUserDetailsInStore(): void {
  //   const roles = this.getRoleFromToken();
  //   console.log('Rôles extraits du token:', roles);
  //   this._userStore.setRolesFromStore(roles);
  // }

  // Obtenir l'ID de l'utilisateur à partir du token
  getUserIdFromToken(): string | null {
    return this._userPayload?.sub || null; // Utiliser 'sub' ou le champ approprié
  }
}
