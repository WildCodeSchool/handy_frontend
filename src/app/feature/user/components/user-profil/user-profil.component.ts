import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { UserProfil } from '../../models/UserProfil';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-profil.component.html',
  styleUrl: './user-profil.component.scss',
})
export class UserProfilComponent implements OnInit {
  userProfile: UserProfil | null = null;
  isLoading = true;
  error: string | null = null;

  constructor(private _userService: UsersService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this._userService.getUserProfile().subscribe({
      next: data => {
        this.userProfile = data;
        this.isLoading = false;
      },
    });
  }

  updateProfile(): void {
    if (this.userProfile) {
      this._userService.updateUserProfile(this.userProfile).subscribe({
        next: data => {
          this.userProfile = data;
          alert('Profil mis à jour avec succès');
        },
      });
    }
  }
}
