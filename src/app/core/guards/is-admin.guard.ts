import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { map, Observable, of, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { UserStoreService } from '../services/user-store.service';

export const isAdminGuard: CanActivateFn = (): Observable<boolean | UrlTree> => {
  const authService = inject(AuthService);
  console.log('authService', 'router', 'userStoreService');

  const router = inject(Router);
  const userStoreService = inject(UserStoreService);

  const rolesFromToken = authService.getRoleFromToken();

  return userStoreService.getRolesFromStore().pipe(
    switchMap(roles => {
      console.log('Rôles récupérés du store:', roles);

      // Je vérifie si les rôles du token incluent 'ROLE_ADMIN'
      if (rolesFromToken.includes('ROLE_ADMIN')) {
        console.log("L'utilisateur est un administrateur");
        return authService.isLoggedInObservable().pipe(map(loggedIn => (loggedIn ? true : router.createUrlTree(['/auth']))));
      }

      console.log("L'utilisateur n'est pas un administrateur");
      return of(router.createUrlTree(['/auth']));
    })
  );
};
// export const isAdminGuard: CanActivateFn = (): Observable<boolean | UrlTree> => {
//   const authService = inject(AuthService);
//   const router = inject(Router);
//   const userStoreService = inject(UserStoreService);

//   return userStoreService.getRolesFromStore().pipe(
//     switchMap(roles => {
//       console.log('Rôles récupérés du store:', roles);

//       if (roles.length === 0) {
//         console.error('Aucun rôle disponible dans le store');
//         return of(router.createUrlTree(['/auth'])); // Rediriger si les rôles sont vides
//       }

//       if (roles.includes('ROLE_ADMIN')) {
//         console.log("L'utilisateur est un administrateur");
//         return authService.isLoggedInObservable().pipe(map(loggedIn => (loggedIn ? true : router.createUrlTree(['/auth']))));
//       }

//       console.log("L'utilisateur n'est pas un administrateur");
//       return of(router.createUrlTree(['/auth']));
//     })
//   );
// };