import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription, tap } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { UserStoreService } from '../../services/user-store.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  isProvider = false;

  private _router: Router = inject(Router);
  private _authSubscription: Subscription = new Subscription();
  private _userStore = inject(UserStoreService);
  private _authService = inject(AuthService);
  private readonly _destroyRef = inject(DestroyRef);

  isAdmin$ = this._userStore.hasRole$('ROLE_ADMIN');
  isProvider$ = this._userStore.hasRole$('ROLE_PROVIDER');

  ngOnInit(): void {
    this._authSubscription = this._authService.authStatus$
      .pipe(
        tap((status: boolean) => {
          this.isLoggedIn = status;
        }),
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe();
  }

  navigateToSignUpPage(): void {
    this._router.navigate(['/auth']);
  }

  onLogout(): void {
    this._authService.logout();
  }
}
