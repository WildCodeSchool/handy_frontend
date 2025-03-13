import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-connection',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-connection.component.html',
  styleUrl: './user-connection.component.scss'
})
export class UserConnectionComponent {

  formBuilder = inject(FormBuilder);

  signUpForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],

    passwords: this.formBuilder.group({
      password: ['', [Validators.required, this.securePasswordValidator()]],
      confirmPassword: ['']
    }, { validators: this.passwordMatchValidator() })
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
      const isValidLength = value.length >= 12;

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

 


}
