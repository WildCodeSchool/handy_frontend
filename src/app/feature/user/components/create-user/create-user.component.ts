import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { passwordMatchValidator, securePasswordValidator } from 'src/app/core/validators/validators';
@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
})
export class CreateUserComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  MIN_PASSWORD_LENGTH = 12;
  MIN_USERNAME_LENGTH = 3;

  signUpForm!: FormGroup;
  selectedRole: 'client' | 'provider' = 'client';

  ngOnInit(): void {
    this._initSignUpForm();
  }

  // private _initSignUpForm(): void {
  //   this.signUpForm = this.formBuilder.group({
  //     username: ['', [Validators.required, Validators.minLength(this.MIN_USERNAME_LENGTH)]],
  //     email: ['', [Validators.required, Validators.email]],
  //     passwords: this.formBuilder.group(
  //       {
  //         password: ['', [Validators.required, this.securePasswordValidator()]],
  //         confirmPassword: [''],
  //       },
  //       { validators: passwordMatchValidator() }
  //     ),
  //   });
  // }
  private _initSignUpForm(): void {
    this.signUpForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(this.MIN_USERNAME_LENGTH)]],
      email: ['', [Validators.required, Validators.email]],
      passwords: this.formBuilder.group(
        {
          password: ['', [Validators.required, securePasswordValidator(this.MIN_PASSWORD_LENGTH)]],
          confirmPassword: [''],
        },
        { validators: passwordMatchValidator() }
      ),
    });
  }

  selectRole(role: 'client' | 'provider'): void {
    this.selectedRole = role;
  }

  // onSubmit(): void {
  //   if (this.signUpForm.valid) {
  //     const email = this.signUpForm.get('email')?.value;
  //     const password = this.signUpForm.get('passwords.password')?.value;

  //     if (email && password) {
  //       const register$ =
  //         this.selectedRole === 'client' ? this.authService.register$(email, password) : this.authService.registerProvider$(email, password);

  //       register$.subscribe({
  //         next: success => {
  //           if (success) {
  //             this.router.navigate(['/products']);
  //           }
  //         },
  //       });
  //     }
  //   }
  // }
  async onSubmit(): Promise<void> {
    if (this.signUpForm.valid) {
      const email = this.signUpForm.get('email')?.value;
      const password = this.signUpForm.get('passwords.password')?.value;
  
      if (email && password) {
        const register$ = this.selectedRole === 'client'
          ? this.authService.register$(email, password)
          : this.authService.registerProvider$(email, password);
  
        try {
          const success = await firstValueFrom(register$);
          if (success) {
            this.router.navigate(['/products']);
          }
        } catch (error) {
          console.error('Erreur lors de l’inscription :', error);
        }
      }
    }
  }
  // securePasswordValidator(): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     const value = control.value || '';

  //     const hasUpperCase = /[A-Z]/.test(value);
  //     const hasLowerCase = /[a-z]/.test(value);
  //     const hasNumber = /\d/.test(value);
  //     const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
  //     const isValidLength = value.length >= this.MIN_PASSWORD_LENGTH;

  //     const passwordValid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isValidLength;

  //     return passwordValid ? null : { securePassword: true };
  //   };
  // }
}
