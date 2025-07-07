import { Component, inject, OnInit } from '@angular/core';
import { UserProfil } from '../../models/UserProfil';
import { UsersService } from '../../services/users.service';
import { tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {
  usersService = inject(UsersService); 
  users: UserProfil[] = []; 
 
 
  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.usersService.getAllUsers()
      .pipe(
        tap((data) => {
          console.log('Données des utilisateurs récupérées:', data); 
        }),
       
      )
      .subscribe({
        next: (data) => {
          this.users = data; 
        },
        error: (error) => {
          console.error('Error fetching users:', error);
        }
      });
  }
}