// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class TokenService {
//   private _token: string | null = null;

//   constructor() {
//     // Initialisation de _token avec la valeur stockée dans localStorage (si elle existe)
//     this._token =
//       localStorage.getItem('token') ||
//       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
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
