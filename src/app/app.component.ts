import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { UserStoreService } from './core/services/user-store.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private _userStore: UserStoreService) {}

  // ngOnInit(): void {
  //   this._userStore.initializeRoles();
  // }
  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this._userStore.initializeRoles();
    }
  }
}
