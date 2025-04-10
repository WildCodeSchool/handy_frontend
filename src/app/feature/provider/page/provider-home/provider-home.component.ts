import { Component } from '@angular/core';
import { BannerHomeComponent } from 'src/app/feature/home/components/banner-home/banner-home.component';

@Component({
  selector: 'app-provider-home',
  standalone: true,
  imports: [BannerHomeComponent],
  templateUrl: './provider-home.component.html',
  styleUrl: './provider-home.component.scss'
})
export class ProviderHomeComponent {

}
