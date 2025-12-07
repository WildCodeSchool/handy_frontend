import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError(err => {

      
      if (err.status === 401 || err.status === 403) {
        authService.logout();
        alert('Votre session a expiré, veuillez vous reconnecter.');
        window.location.href = '/auth';
      }

      return throwError(() => err);
    })
  );
};
