import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-user-connection',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './user-connection.component.html',
  styleUrl: './user-connection.component.scss',
})
export class UserConnectionComponent implements OnDestroy {
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  private _router: Router = inject(Router);
  private _subscription = new Subscription();


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
          localStorage.setItem('token', token);
        },
        
      });
    }
  }
 
  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
  
}
