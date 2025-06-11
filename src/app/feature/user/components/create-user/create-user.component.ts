import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ClientSignUpComponent } from '../client-sign-up/client-sign-up.component';
import { ProviderSignUpComponent } from '../provider-sign-up/provider-sign-up.component';
@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ClientSignUpComponent, ProviderSignUpComponent],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
})
export class CreateUserComponent  {
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  selectedRole: 'client' | 'provider' = 'client';

  selectRole(role: 'client' | 'provider'): void {
    this.selectedRole = role;
  }

  // MIN_PASSWORD_LENGTH = 12;
  // MIN_USERNAME_LENGTH = 3;

  // signUpForm!: FormGroup;
  // selectedRole: 'client' | 'provider' = 'client';

  // ngOnInit(): void {
  //   this._initSignUpForm();
  // }

 
  // private _initSignUpForm(): void {
  //   this.signUpForm = this.formBuilder.group({
  //     username: ['', [Validators.required, Validators.minLength(this.MIN_USERNAME_LENGTH)]],
  //     email: ['', [Validators.required, Validators.email]],
  //     passwords: this.formBuilder.group(
  //       {
  //         password: ['', [Validators.required, securePasswordValidator(this.MIN_PASSWORD_LENGTH)]],
  //         confirmPassword: [''],
  //       },
  //       { validators: passwordMatchValidator() }
  //     ),
  //   });
  // }

  // selectRole(role: 'client' | 'provider'): void {
  //   this.selectedRole = role;
  // }

  
  // async onSubmit(): Promise<void> {
  //   if (this.signUpForm.valid) {
  //     const email = this.signUpForm.get('email')?.value;
  //     const password = this.signUpForm.get('passwords.password')?.value;

  //     if (email && password) {
  //       const register$ =
  //         this.selectedRole === 'client' ? this.authService.register$(email, password) : this.authService.registerProvider$(email, password);

  //       try {
  //         const success = await firstValueFrom(register$);
  //         if (success) {
  //           this.router.navigate(['/products']);
  //         }
  //       } catch (error) {
  //         console.error('Erreur lors de l’inscription :', error);
  //       }
  //     }
  //   }
  // }

}
