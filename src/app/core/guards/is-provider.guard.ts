import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { map, Observable, of, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserStoreService } from '../services/user-store.service';
import { ROLES } from '../enum/constants';

export const isProviderGuard: CanActivateFn = (): Observable<boolean | UrlTree> => {
  const authService = inject(AuthService);

  const router = inject(Router);
  const userStoreService = inject(UserStoreService);

  const rolesFromToken = authService.getRoleFromToken();

  return userStoreService.getRolesFromStore().pipe(
    switchMap(() => {
      if (rolesFromToken.includes(ROLES.PROVIDER)) {
        return authService.isLoggedInObservable().pipe(map(loggedIn => (loggedIn ? true : router.createUrlTree(['/auth']))));
      }
      return of(router.createUrlTree(['/auth']));
    })
  );
};
