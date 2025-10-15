import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { UsersSignUpComponent } from '../users-sign-up/users-sign-up.component';
import { FormErrorComponent } from 'src/app/core/errors/form-error/form-error.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-provider-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, FormErrorComponent, CommonModule, RouterLink],
  templateUrl: './provider-sign-up.component.html',
  styleUrl: './provider-sign-up.component.scss',
})
export class ProviderSignUpComponent extends UsersSignUpComponent {
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);
  showPassword = false;
  showConfirmPassword = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  togglePasswordVisibilityOnKey(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      this.togglePasswordVisibility();
    }
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  toggleConfirmPasswordVisibilityOnKey(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      this.toggleConfirmPasswordVisibility();
    }
  }
  onSubmit(): void {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }

    const credentials = this.getEmailAndPassword();
    if (!credentials) return;

    this._authService
      .registerProvider$(credentials.email, credentials.password)
      .pipe(take(1))
      .subscribe({
        next: success => {
          if (success) this._router.navigate(['/products']);
        },
        error: err => {
          console.error('Erreur lors de l’inscription du prestataire :', err);
        },
      });
  }
}
