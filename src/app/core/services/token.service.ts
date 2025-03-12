import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private _token: string | null = null;

  constructor() {
    // Initialisation de _token avec la valeur stockée dans localStorage (si elle existe)
    this._token = localStorage.getItem('token');
  }

  setToken(token: string): void {
    this._token = token;
    localStorage.setItem('token', token);  // Sauvegarde du token dans localStorage
  }

  isLogged(): boolean {
    const token = this.getToken();
    console.log(token);
    return !!token;  // Si le token existe, l'utilisateur est connecté
  }

  getToken(): string | null {
    return this._token;  // Retourne la valeur de _token (qui est mise à jour lors de la création)
  }

  clearToken(): void {
    this._token = null;
    localStorage.removeItem('token');  // Supprime le token du localStorage
  }
}