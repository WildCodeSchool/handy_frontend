import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProviderListComponent } from '../../../provider/components/provider-list/provider-list.component';
import { BannerHomeComponent } from '../../components/banner-home/banner-home.component';
import { TestimonialsComponent } from '../../components/testimonials/testimonials.component';
import { AboutUsComponent } from '../../components/about-us/about-us.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ProviderListComponent, BannerHomeComponent, TestimonialsComponent, AboutUsComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  constructor(private _router: Router) {}

  // navigateToSignUpPage() {
  //   this._router.navigate(['/signup']);
}
