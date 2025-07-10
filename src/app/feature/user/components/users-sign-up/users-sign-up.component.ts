import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator, securePasswordValidator } from 'src/app/core/validators/validators';

@Component({
  selector: 'app-users-sign-up',
  standalone: true,
  imports: [],
  templateUrl: './users-sign-up.component.html',
  styleUrl: './users-sign-up.component.scss'
})
export class UsersSignUpComponent {

  protected readonly _MIN_USERNAME_LENGTH = 3;
  protected readonly _MIN_PASSWORD_LENGTH = 12;

  protected readonly formBuilder = inject(FormBuilder);

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

  protected getEmailAndPassword(): { email: string; password: string } | null {
    const email = this.signUpForm.get('email')?.value;
    const password = this.signUpForm.get('passwords.password')?.value;

    if (email && password) {
      return { email, password };
    }
    return null;
  }
}
