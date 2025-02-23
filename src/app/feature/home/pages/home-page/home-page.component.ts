import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProviderListComponent } from '../../../provider/components/provider-list/provider-list.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ProviderListComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  constructor(private _router: Router) {}

  // navigateToSignUpPage() {
  //   this._router.navigate(['/signup']);
}
