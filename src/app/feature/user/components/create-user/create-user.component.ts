import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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

  MIN_PASSWORD_LENGTH = 12;
  MIN_USERNAME_LENGTH = 3;

  // loginForm = this.formBuilder.group({
  //   email: ['', [Validators.required, Validators.email]],
  //   password: ['', [Validators.required]],
  // }) as FormGroup<{
  //   email: FormControl<string>;
  //   password: FormControl<string>;
  // }>;

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
  passwordMatchValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const password = formGroup.get('password')?.value;
      const confirmPassword = formGroup.get('confirmPassword')?.value;

      console.log('Vérification du mot de passe :');
      console.log('Mot de passe :', password);
      console.log('Confirmer le mot de passe :', confirmPassword);
      return password === confirmPassword ? null : { passwordsMismatch: true };
    };
  }
  onSubmit(): void {
    if (this.signUpForm.valid) {
      console.log('Formulaire envoyé avec succès', this.signUpForm.value);
      console.log('Erreurs de validation:', this.signUpForm.errors);
      console.log('Erreurs des mots de passe:', this.signUpForm.get('passwords')?.errors);
    } else {
      console.log('Formulaire invalide');
    }
  }

  securePasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || '';
      console.log('Vérification du mot de passe:', value);

      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumber = /\d/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      const isValidLength = value.length >= this.MIN_PASSWORD_LENGTH;

      console.log('Contient une majuscule:', hasUpperCase);
      console.log('Contient une minuscule:', hasLowerCase);
      console.log('Contient un chiffre:', hasNumber);
      console.log('Contient un caractère spécial:', hasSpecialChar);
      console.log('Longueur valide:', isValidLength);

      const passwordValid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isValidLength;
      console.log('Mot de passe valide:', passwordValid);

      return passwordValid ? null : { securePassword: true };
    };
  }

  // navigateToSignUpPage() {
  //   this._router.navigate(['/signup']);
}
