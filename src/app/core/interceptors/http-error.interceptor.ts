import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError(err => {
      if (err.status === 401 || err.status === 403) {
        authService.logout();
        alert('Votre session a expiré, veuillez vous reconnecter.');
        router.navigate(['/login']);
      }

      return throwError(() => err);
    })
  );
};
