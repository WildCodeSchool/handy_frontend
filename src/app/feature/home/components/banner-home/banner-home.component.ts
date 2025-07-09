import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './banner-home.component.html',
  styleUrl: './banner-home.component.scss',
})
export class BannerHomeComponent {
  keyword: string = '';

  constructor(private _router: Router) {}

  onSearch(): void {
    if (this.keyword.trim()) {
      this._router.navigate(['/products'], { queryParams: { search: this.keyword } });
    }
  }
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
