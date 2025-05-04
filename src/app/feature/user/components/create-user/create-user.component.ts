import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { passwordMatchValidator } from 'src/app/core/validators/validators';
@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
})
export class CreateUserComponent {
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  

  MIN_PASSWORD_LENGTH = 12;
  MIN_USERNAME_LENGTH = 3;

 

  signUpForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(this.MIN_USERNAME_LENGTH)]],
    email: ['', [Validators.required, Validators.email]],

    passwords: this.formBuilder.group(
      {
        password: ['', [Validators.required, this.securePasswordValidator()]],
        confirmPassword: [''],
      },
      { validators: passwordMatchValidator() }
    ),
  });

  selectedRole: 'client' | 'provider' = 'client';

  selectRole(role: 'client' | 'provider'): void {
    this.selectedRole = role;
  }
  passwordMatchValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const password = formGroup.get('password')?.value;
      const confirmPassword = formGroup.get('confirmPassword')?.value;
      return password === confirmPassword ? null : { passwordsMismatch: true };
    };
  }
  // onSubmit(): void {
  //   if (this.signUpForm.valid) {
  //     this.router.navigate(['/products']);
  //   } else {
  //     console.log('Formulaire invalide');
  //   }
  // }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      const email = this.signUpForm.get('email')?.value;
      const password = this.signUpForm.get('passwords.password')?.value;
  
      if (email && password) {
        
        this.authService.register$(email, password).subscribe({
          next: (success) => {
            if (success) {
              this.router.navigate(['/products']);
            } else {
              console.log('Échec de l\'inscription');
            }
          },
          error: (err) => {
            console.error('Erreur lors de l\'inscription :', err);
          }
        });
      } else {
        console.log('Email ou mot de passe invalide');
      }
    } else {
      console.log('Formulaire invalide');
    }
  }
  onSubmitProvider(): void {
    if (this.signUpForm.valid) {
      const email = this.signUpForm.get('email')?.value;
      const password = this.signUpForm.get('passwords.password')?.value;
  
      if (email && password) {
        
        this.authService.registerProvider$(email, password).subscribe({
          next: (success) => {
            if (success) {
              this.router.navigate(['/products']);
            } else {
              console.log('Échec de l\'inscription');
            }
          },
          error: (err) => {
            console.error('Erreur lors de l\'inscription :', err);
          }
        });
      } else {
        console.log('Email ou mot de passe invalide');
      }
    } else {
      console.log('Formulaire invalide');
    }
  }


  securePasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || '';

      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumber = /\d/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      const isValidLength = value.length >= this.MIN_PASSWORD_LENGTH;

      const passwordValid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isValidLength;

      return passwordValid ? null : { securePassword: true };
    };
  }
}
