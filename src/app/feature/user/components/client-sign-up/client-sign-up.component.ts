import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { UsersSignUpComponent } from '../users-sign-up/users-sign-up.component';
import { FormErrorComponent } from 'src/app/core/errors/form-error/form-error.component';

@Component({
  selector: 'app-client-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, FormErrorComponent],
  templateUrl: './client-sign-up.component.html',
  styleUrl: './client-sign-up.component.scss',
})
export class ClientSignUpComponent extends UsersSignUpComponent {
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  onSubmit(): void {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }

    const credentials = this.getEmailAndPassword();
    if (!credentials) return;

    this._authService
      .register$(credentials.email, credentials.password)
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
