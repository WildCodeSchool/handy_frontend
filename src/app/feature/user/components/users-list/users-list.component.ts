import { Component, inject, } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, switchMap } from 'rxjs';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent  {

  // private _usersService = inject(UsersService);

  // users$ = this._usersService.getAllUsers();
  private _usersService = inject(UsersService);
private _refresh$ = new BehaviorSubject<void>(undefined);

users$ = this._refresh$.pipe(
  switchMap(() => this._usersService.getAllUsers())
);

deleteUser(userId: number):void {
  if (userId == null) return;
  this._usersService.deleteUser(userId).subscribe({
    next: () => this._refresh$.next(),
    error: err => console.error('Erreur suppression utilisateur', err),
  });

}}
