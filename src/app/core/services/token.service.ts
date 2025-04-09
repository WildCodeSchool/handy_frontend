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
