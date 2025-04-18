import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { map, Observable, of, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { UserStoreService } from '../services/user-store.service';

export const isAdminGuard: CanActivateFn = (): Observable<boolean | UrlTree> => {
  const authService = inject(AuthService);

  const router = inject(Router);
  const userStoreService = inject(UserStoreService);

  const rolesFromToken = authService.getRoleFromToken();

  return userStoreService.getRolesFromStore().pipe(
    switchMap(() => {
      if (rolesFromToken.includes('ROLE_ADMIN')) {
        return authService.isLoggedInObservable().pipe(
          map(loggedIn => (loggedIn ? true : router.createUrlTree(['/auth'])))
        );
      }

      return of(router.createUrlTree(['/auth']));
    })
  );
};
