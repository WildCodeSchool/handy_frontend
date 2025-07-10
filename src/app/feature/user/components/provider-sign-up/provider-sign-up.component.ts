import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { UsersSignUpComponent } from '../users-sign-up/users-sign-up.component';
import { FormErrorComponent } from 'src/app/core/errors/form-error/form-error.component';

@Component({
  selector: 'app-provider-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, FormErrorComponent],
  templateUrl: './provider-sign-up.component.html',
  styleUrl: './provider-sign-up.component.scss',
})
export class ProviderSignUpComponent extends UsersSignUpComponent {
  //   private readonly _MIN_USERNAME_LENGTH = 3;
  //   private readonly _MIN_PASSWORD_LENGTH = 12;
  //   private readonly _formBuilder = inject(FormBuilder);
  //   private readonly _authService = inject(AuthService);
  //   private readonly _router = inject(Router);

  //   formBuilder = inject(FormBuilder);
  //   signUpForm: FormGroup = this.formBuilder.group({
  //     username: ['', [Validators.required, Validators.minLength(this._MIN_USERNAME_LENGTH)]],
  //     email: ['', [Validators.required, Validators.email]],
  //     passwords: this.formBuilder.group(
  //       {
  //         password: ['', [Validators.required, securePasswordValidator(this._MIN_PASSWORD_LENGTH)]],
  //         confirmPassword: [''],
  //       },
  //       { validators: passwordMatchValidator() }
  //     ),
  //   });

  //   async onSubmit(): Promise<void> {
  //     if (this.signUpForm.invalid) {
  //       this.signUpForm.markAllAsTouched();
  //       return;
  //     }

  //     const email = this.signUpForm.get('email')?.value;
  //     const password = this.signUpForm.get('passwords.password')?.value;

  //     if (email && password) {
  //       try {
  //         const success = await firstValueFrom(this._authService.registerProvider$(email, password));
  //         if (success) {
  //           this._router.navigate(['/products']);
  //         }
  //       } catch (error) {
  //         console.error('Erreur lors de l’inscription du prestataire :', error);
  //       }
  //     }
  //   }
  // }
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
