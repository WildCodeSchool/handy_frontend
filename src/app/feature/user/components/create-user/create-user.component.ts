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
export class CreateUserComponent {
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  selectedRole: 'client' | 'provider' = 'client';

  selectRole(role: 'client' | 'provider'): void {
    this.selectedRole = role;
  }
}
