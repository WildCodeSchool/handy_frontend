// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class TokenService {
//   private _token: string | null = null;

//   constructor() {
//     this._token =
//       localStorage.getItem('token') ||
//       'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pNzc3QGV4YW1wbGUuY29tIiwicm9sZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfUFJFU1RBVEFJUkUifV0sImlhdCI6MTc0MTc4MTYyNiwiZXhwIjoxNzQxNzg1MjI2fQ.b6uwvV4YT0QWI8nYQX8J-sxSgMCY1HA2gX2C9Mgq1vM';
//   }

//   setToken(token: string): void {
//     this._token = token;
//     localStorage.setItem('token', token); // Sauvegarde du token dans localStorage
//   }

//   isLogged(): boolean {
//     const token = this.getToken();
//     console.log(token);
//     return !!token; // Si le token existe, l'utilisateur est connecté
//   }

//   getToken(): string | null {
//     return this._token; // Retourne la valeur de _token (qui est mise à jour lors de la création)
//   }

//   clearToken(): void {
//     this._token = null;
//     localStorage.removeItem('token'); // Supprime le token du localStorage
//   }
// }

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private _token: string | null = null;

  constructor() {
    this._token =
      localStorage.getItem('token') 
  }

  setToken(token: string): void {
    this._token = token;
    localStorage.setItem('token', token); 
  }

  isLogged(): boolean {
    const token = this.getToken();
    console.log(token);
    return !!token; 
  }

  getToken(): string | null {
    return this._token; 
  }

  clearToken(): void {
    this._token = null;
    localStorage.removeItem('token'); 
  }
}
