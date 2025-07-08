import { Component, inject, OnInit } from '@angular/core';
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
  editableProfile: UserProfil = { email: '', firstName: '', lastName: '', address: '', city: '' };
  isUpdating = false;
  private readonly _userService = inject(UsersService);
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
// export class UserProfilComponent {
//   private readonly _userService = inject(UsersService);

//   error: string | null = null;
//   isUpdating = false;

//   userProfile$: Observable<UserProfil | null> = this._userService.getUserProfile().pipe(
//     tap(() => (this.error = null)),
  
//   );

//   updateProfile(profile: UserProfil):void {
//     this.isUpdating = true;

//     this._userService.updateUserProfile(profile).subscribe({
//       next: updated => {
//         alert('Profil mis à jour !');
//         this.userProfile$ = of(updated); // ou re-fetch depuis backend si nécessaire
//         this.isUpdating = false;
//       },
//     });
//   }
// }