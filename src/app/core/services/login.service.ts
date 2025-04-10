import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private _authService: AuthService, private _router: Router) {}

  onLogin(email: string, password: string): void {
    this._authService.login$(email, password).subscribe({
      next: () => {
        const roles = this._authService.getRoleFromToken();
        console.log('Rôles après login :', roles);

        if (roles.includes('ROLE_PROVIDER')) {
          this._router.navigate(['/providers']);
        } else if (roles.includes('ROLE_USER')) {
          this._router.navigate(['/products']); 
        } else {
          this._router.navigate(['/']);
        }
      },
      error: err => {
        console.error('Erreur de login', err);
      }
    });
  }
}