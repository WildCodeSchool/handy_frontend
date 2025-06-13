import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CalendarComponent } from 'src/app/feature/calendars/components/calendar/calendar.component';
import { UserProfilComponent } from 'src/app/feature/user/components/user-profil/user-profil.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProvidersService } from '../../service/providers.service';
import { Observable, tap } from 'rxjs';
import { ProductService } from 'src/app/feature/product/services/product.service';
import { AppProvider } from 'src/app/feature/product/models/provider';
import { ProvisionDto } from 'src/app/feature/product/models/provisionDto';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-provider-profil',
  standalone: true,
  imports: [CalendarComponent, UserProfilComponent, CommonModule, FormsModule, AsyncPipe],
  templateUrl: './provider-profil.component.html',
  styleUrl: './provider-profil.component.scss',
})
export class ProviderProfilComponent implements OnInit {
  provisions$!: Observable<AppProvider[]>;
  selectedProvisionId?: number;
  message = '';

  private readonly _productService = inject(ProductService);
  private readonly _providersService = inject(ProvidersService);
  private readonly _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.loadProvisions();
  }

  loadProvisions(): void {
    this.provisions$ = this._productService.getAllProvisions$().pipe(tap(() => (this.message = '')));
  }

  attachServiceToConnectedProvider(): void {
    if (!this.selectedProvisionId) {
      this.message = 'Veuillez sélectionner un service.';
      return;
    }

    const provisionIdNum = Number(this.selectedProvisionId);
    if (isNaN(provisionIdNum)) {
      this.message = 'Veuillez sélectionner un service valide.';
      return;
    }

    const dto: ProvisionDto[] = [{ provisionId: provisionIdNum }];

    this._providersService
      .attachServiceToConnectedProvider(dto)
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        tap({
          next: () => (this.message = 'Service ajouté avec succès !'),
          error: () => {
            this.message = "Erreur lors de l'ajout du service.";
          },
        })
      )
      .subscribe();
  }
}
