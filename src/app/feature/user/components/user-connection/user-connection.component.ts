import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-user-connection',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-connection.component.html',
  styleUrl: './user-connection.component.scss',
})
export class UserConnectionComponent {
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);

  loginForm = this.formBuilder.group({
    email: [''],
    password: [''],
  }) as FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }>;

  onLogin(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.getRawValue();

      this.authService.login$(email, password).subscribe({
        next: token => {
          console.log('Connexion réussie, token :', token);
        },
        error: err => {
          console.error('Erreur de connexion', err);
        },
      });
    } else {
      console.log('Formulaire de connexion invalide');
    }
  }
}
