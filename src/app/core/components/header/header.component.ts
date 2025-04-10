import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  // message: string | null = null;

  private _router: Router = inject(Router);
  private _authSubscription: Subscription = new Subscription();
  constructor(private _authService: AuthService) {}

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

    
  }

  navigateToSignUpPage(): void {
    this._router.navigate(['/signup']);
  }
  onLogout(): void {
    this._authService.logout();
  }
}
