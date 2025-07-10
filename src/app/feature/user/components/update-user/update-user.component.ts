import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserProfil } from '../../models/UserProfil';
import { UsersService } from '../../services/users.service';
import { UserStoreService } from 'src/app/core/services/user-store.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [FormsModule, AsyncPipe],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss',
})
export class UpdateUserComponent implements OnChanges {
  @Input() user!: UserProfil;
  @Output() updated = new EventEmitter<void>();
  editableProfile: UserProfil = { email: '', firstName: '', lastName: '', address: '', city: '' };
  isUpdating = false;
  isLoading = false;
  error: string | null = null;

  private readonly _userService = inject(UsersService);
private _userStore = inject(UserStoreService);
successMessageUpdate: string | null = null;


  isAdmin$ = this._userStore.hasRole$('ROLE_ADMIN');
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && this.user) {
      this.editableProfile = { ...this.user };
    }
  }

  updateProfile(): void {
    this.isUpdating = true;
    this._userService.updateUserProfile(this.editableProfile).subscribe({
      next: data => {
        this.isUpdating = false;
        this.editableProfile = data;
        this.successMessageUpdate = 'Profil mis à jour avec succès !';
        this.updated.emit();
      },
      error: err => {
        this.isUpdating = false;
        this.error = 'Erreur lors de la mise à jour.';
        console.error(err);
      },
    });
  }

  updateProfileAsAdmin(): void {
    if (!this.editableProfile.id) {
      this.error = 'ID utilisateur manquant pour la mise à jour admin.';
      return;
    }
  
    this.isUpdating = true;
  
    const updatePayload = {
      email: this.editableProfile.email,
      firstName: this.editableProfile.firstName,
      lastName: this.editableProfile.lastName,
      address: this.editableProfile.address,
      city: this.editableProfile.city,
    };
  
    this._userService.updateUserByAdmin(this.editableProfile.id, updatePayload).subscribe({
      next: data => {
        this.isUpdating = false;
        this.editableProfile = data;
        this.successMessageUpdate = 'Profil mis à jour avec succès !';
        this.updated.emit();
      },
      error: err => {
        this.isUpdating = false;
        this.error = 'Erreur lors de la mise à jour (admin).';
        console.error(err);
      },
    });
  }
}
