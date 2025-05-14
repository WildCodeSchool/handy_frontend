import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    console.log('Vérification du mot de passe :');
    console.log('Mot de passe :', password);
    console.log('Confirmer le mot de passe :', confirmPassword);

    return password === confirmPassword ? null : { passwordsMismatch: true };
  };
}
