import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { map, Observable, of, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserStoreService } from '../services/user-store.service';

export const isProviderGuard: CanActivateFn = (): Observable<boolean | UrlTree> => {
  const authService = inject(AuthService);
  console.log('authService', 'router', 'userStoreService');

  const router = inject(Router);
  const userStoreService = inject(UserStoreService);

  const rolesFromToken = authService.getRoleFromToken();

  return userStoreService.getRolesFromStore().pipe(
    switchMap(roles => {
      console.log('Rôles récupérés du store:', roles);

      if (rolesFromToken.includes('ROLE_PROVIDER')) {
        console.log("L'utilisateur est un provider");
        return authService.isLoggedInObservable().pipe(map(loggedIn => (loggedIn ? true : router.createUrlTree(['/auth']))));
      }

      console.log("L'utilisateur n'est pas un provider");
      return of(router.createUrlTree(['/auth']));
    })
  );
};
