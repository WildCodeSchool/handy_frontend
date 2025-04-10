import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit{
  isLoggedIn: boolean = false;
  private _router: Router = inject(Router);
  private _authSubscription: Subscription = new Subscription();
  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    // Souscrire à l'Observable qui indique si l'utilisateur est connecté
    this._authSubscription = this._authService.isLoggedInObservable().subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    });
  }
  
  

  navigateToSignUpPage(): void {
    this._router.navigate(['/signup']);
  }
  onLogout(): void {
    this._authService.logout();
  }
}
