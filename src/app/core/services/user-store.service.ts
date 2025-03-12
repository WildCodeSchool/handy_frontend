import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private _roles = new BehaviorSubject<string[]>([]);
  private _fullName = new BehaviorSubject<string>('');

  constructor(private _authService: AuthService) {
    // Par exemple, on pourrait initialiser les valeurs ici avec les données de l'authentification
    const roles = this._authService.getRoleFromToken();
    this._roles.next(roles);
    
   
  }

  public getRolesFromStore(): Observable<string[]> {
    return this._roles.asObservable();
  }

  public setRolesFromStore(roles: string[]): void {
    this._roles.next(roles);
    console.log('les rôles:', roles);
  }

  public getFullNameFromStore(): Observable<string> {
    return this._fullName.asObservable();
  }

  public setFullNameFromStore(fullName: string): void {
    this._fullName.next(fullName);
  }
}