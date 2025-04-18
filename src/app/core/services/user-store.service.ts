import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  private _roles = new BehaviorSubject<string[]>([]);
  private _fullName = new BehaviorSubject<string>('');
  private _authService!: AuthService;

  constructor(private _injector: Injector) {}

  private get _authServiceInstance(): AuthService {
    if (!this._authService) {
      this._authService = this._injector.get(AuthService);
    }
    return this._authService;
  }

  initializeRoles(): void {
    const roles = this._authServiceInstance.getRoleFromToken();

    if (roles && roles.length > 0) {
      this._roles.next(roles);
     
  }}

  public getRolesFromStore(): Observable<string[]> {
    return this._roles.asObservable();
  }

  public setRolesFromStore(roles: string[]): void {
    this._roles.next(roles);
  }

  public getFullNameFromStore(): Observable<string> {
    return this._fullName.asObservable();
  }

  public setFullNameFromStore(fullName: string): void {
    this._fullName.next(fullName);
  }

  public hasRole$(role: string): Observable<boolean> {
    return this._roles.asObservable().pipe(map(roles => roles.includes(role)));
  }

  public clearRoles(): void {
    this._roles.next([]);
    console.log('Les rôles ont été réinitialisés dans le store.');
  }
}
