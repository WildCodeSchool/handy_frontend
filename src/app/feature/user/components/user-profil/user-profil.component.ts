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
// userProfile$: Observable<UserProfil> = this._userService.getUserProfile().pipe(
//   takeUntilDestroyed(),
//   catchError(() => {
//     this.error = "Erreur lors du chargement du profil.";
//     return of({ firstName: '', lastName: '', address: '', city: '' } as UserProfil);
//   })
// );
// ngOnInit(): void {
//   this._userService.getUserProfile()
//     .pipe(
//       takeUntilDestroyed(),

//     )
//     .subscribe(profile => {
//       if (profile) {
//         this.userProfile = profile;
//       }
//       this.isLoading = false;
//     });
// }

// updateProfile(): void {
//   if (!this.userProfile) return;

//   this.isUpdating = true;
//   this._userService.updateUserProfile(this.userProfile).subscribe({
//     next: updated => {
//       this.userProfile = updated;
//       this.isUpdating = false;
//       alert('Profil mis à jour avec succès');
//     },
//     error: () => {
//       this.error = "Erreur lors de la mise à jour.";
//       this.isUpdating = false;
//     }
//   });
// }}
