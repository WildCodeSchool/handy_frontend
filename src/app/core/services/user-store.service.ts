// import { Injectable, Injector } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class UserStoreService {
//   private _roles = new BehaviorSubject<string[]>([]);
//   private _fullName = new BehaviorSubject<string>('');
//   private _authService!: any; // Type `any` pour éviter la dépendance immédiate

//   constructor(private _injector: Injector) {}

//   private get _authServiceInstance(): any {
//     if (!this._authService) {
//       this._authService = this._injector.get('AuthService'); // Injection retardée
//     }
//     return this._authService;
//   }

//   initializeRoles(): void {
//     const roles = this._authServiceInstance.getRoleFromToken();
//     this._roles.next(roles);
//   }

//   public getRolesFromStore(): Observable<string[]> {
//     return this._roles.asObservable();
//   }

//   // public setRolesFromStore(roles: string[]): void {
//   //   this._roles.next(roles);
//   //   console.log('les rôles:', roles);
//   // }

//   public setRolesFromStore(roles: any): void {
//     if (Array.isArray(roles)) {
//       this._roles.next(roles);
//     } else if (roles && Array.isArray(roles.roles)) {
//       this._roles.next(roles.roles || []);
//     } else {
//       console.warn('Format de données invalide pour setRolesFromStore');
//       this._roles.next([]);
//     }
//     console.log('Les rôles:', this._roles.value);
//   }
//   public getFullNameFromStore(): Observable<string> {
//     return this._fullName.asObservable();
//   }

//   public setFullNameFromStore(fullName: string): void {
//     this._fullName.next(fullName);
//   }
// }
