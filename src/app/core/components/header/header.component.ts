import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription, tap } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { UserStoreService } from '../../services/user-store.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  isProvider = false;

  private _router: Router = inject(Router);
  private _authSubscription: Subscription = new Subscription();
  private _userStore = inject(UserStoreService);
  private _authService = inject(AuthService);

  isAdmin$ = this._userStore.hasRole$('ROLE_ADMIN');

  ngOnInit(): void {
    this._authSubscription = this._authService.authStatus$
      .pipe(
        tap((status: boolean) => {
          this.isLoggedIn = status;
          this.isProvider = status && this._authService.getRoleFromToken().includes('ROLE_PROVIDER');
        })
      )
      .subscribe();
  }

  navigateToSignUpPage(): void {
    this._router.navigate(['/auth']);
  }

  onLogout(): void {
    this._authService.logout();
  }

  ngOnDestroy(): void {
    if (this._authSubscription) {
      this._authSubscription.unsubscribe();
    }
  }
}
