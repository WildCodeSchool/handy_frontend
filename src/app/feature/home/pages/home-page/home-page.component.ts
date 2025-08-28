import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BannerHomeComponent } from '../../components/banner-home/banner-home.component';
import { TestimonialsComponent } from '../../components/testimonials/testimonials.component';
import { AboutUsComponent } from '../../components/about-us/about-us.component';
import { ProductListComponent } from '../../../../feature/product/components/product-list/product-list.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ProductListComponent, BannerHomeComponent, TestimonialsComponent, AboutUsComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  constructor(private _router: Router) {}
}
