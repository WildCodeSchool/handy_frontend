import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { passwordMatchValidator, securePasswordValidator } from 'src/app/core/validators/validators';

@Component({
  selector: 'app-provider-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './provider-sign-up.component.html',
  styleUrl: './provider-sign-up.component.scss',
})
export class ProviderSignUpComponent {
  private readonly _MIN_USERNAME_LENGTH = 3;
  private readonly _MIN_PASSWORD_LENGTH = 12;
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  formBuilder = inject(FormBuilder);
  signUpForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(this._MIN_USERNAME_LENGTH)]],
    email: ['', [Validators.required, Validators.email]],
    passwords: this.formBuilder.group(
      {
        password: ['', [Validators.required, securePasswordValidator(this._MIN_PASSWORD_LENGTH)]],
        confirmPassword: [''],
      },
      { validators: passwordMatchValidator() }
    ),
  });

  async onSubmit(): Promise<void> {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }

    const email = this.signUpForm.get('email')?.value;
    const password = this.signUpForm.get('passwords.password')?.value;

    if (email && password) {
      try {
        const success = await firstValueFrom(this._authService.registerProvider$(email, password));
        if (success) {
          this._router.navigate(['/products']);
        }
      } catch (error) {
        console.error('Erreur lors de l’inscription du prestataire :', error);
      }
    }
  }

}
