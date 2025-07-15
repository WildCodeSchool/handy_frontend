import { Component, inject } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { UserProfil } from '../../models/UserProfil';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user-profil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-profil.component.html',
  styleUrl: './user-profil.component.scss',
})
export class UserProfilComponent {
  private readonly _userService = inject(UsersService);

  isUpdating = false;

  userProfile$ = this._userService.getUserProfile();

  updateProfile(profile: UserProfil): void {
    this.isUpdating = true;
    this._userService
      .updateUserProfile(profile)
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: () => {
          alert('Profil mis à jour avec succès');
          this.isUpdating = false;
        },
        error: () => {
          alert('Erreur lors de la mise à jour');
          this.isUpdating = false;
        },
      });
  }
}
