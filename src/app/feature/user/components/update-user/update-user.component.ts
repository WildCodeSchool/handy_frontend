import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserProfil } from '../../models/UserProfil';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [FormsModule],
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
        alert('Profil mis à jour avec succès');
        this.updated.emit();
      },
      error: err => {
        this.isUpdating = false;
        this.error = 'Erreur lors de la mise à jour.';
        console.error(err);
      },
    });
  }
}
