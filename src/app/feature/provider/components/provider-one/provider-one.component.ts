import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProvidersService } from '../../service/providers.service';
import { ProviderWithServicesDTO } from 'src/app/feature/cart/models/ProviderWithServicesDTO';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-provider-one',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './provider-one.component.html',
  styleUrl: './provider-one.component.scss',
})
export class ProviderOneComponent {
  private _route = inject(ActivatedRoute);
  private _providerService = inject(ProvidersService);

  provider = signal<ProviderWithServicesDTO | null>(null);
  error = signal<string | null>(null);

  id = computed(() => Number(this._route.snapshot.paramMap.get('id')));

  constructor() {
    effect(() => {
      const providerId = this.id();
      this._providerService.getProviderWithServices(providerId).subscribe({
        next: data => this.provider.set(data),
        error: err => {
          this.error.set('Provider not found or server error');
          console.error(err);
        },
      });
    });
  }
}
