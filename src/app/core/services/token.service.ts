import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private _token: string | null = null;

  constructor() {
    this._token = localStorage.getItem('token');
  }

  setToken(token: string): void {
    this._token = token;
    localStorage.setItem('token', token);
    // console.log('Token sauvegardé dans localStorage:', token);
  }

  isLogged(): boolean {
    const token = this.getToken();
    console.log(token);
    return !!token;
  }

  getToken(): string | null {
    // console.log('Récupération du token:', this._token);
    return localStorage.getItem('token');
  }

  clearToken(): void {
    this._token = null;
    localStorage.removeItem('token');
  }
}
