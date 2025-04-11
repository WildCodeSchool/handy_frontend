import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { UserStoreService } from '../../services/user-store.service';

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

  isAdmin$ = this._userStore.hasRole$('ROLE_ADMIN');
  // constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this._authSubscription = this._authService.authStatus$.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    });

    // this._authService.logoutMessage$.subscribe((msg) => {
    //   if (msg) {
    //     this.message = msg;

    //     // Efface le message après quelques secondes
    //     setTimeout(() => {
    //       this.message = null;
    //     }, 3000);
    //   }
    // });

    this._authSubscription = this._authService.authStatus$.subscribe(status => {
      this.isLoggedIn = status;

      if (status) {
        const roles = this._authService.getRoleFromToken();
        this.isProvider = roles.includes('ROLE_PROVIDER');
      } else {
        this.isProvider = false;
      }
    });
  }

  navigateToSignUpPage(): void {
    this._router.navigate(['/auth']);
  }
  onLogout(): void {
    this._authService.logout();
  }
}
