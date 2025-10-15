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
import { AuthService } from 'src/app/core/services/auth.service';

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
  existingServices: number[] = [];
  providerId!: number;

  private readonly _productService = inject(ProductService);
  private readonly _providersService = inject(ProvidersService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _authService = inject(AuthService);

  ngOnInit(): void {
    this.loadProvisions();
    this.loadExistingServices();
  }

  loadExistingServices(): void {
    if (!this.providerId) {
      this.message = 'ID du fournisseur non défini.';
      return;
    }
    this._providersService.getProviderWithServices(this.providerId).subscribe({
      next: providerData => {
        this.existingServices = providerData.services.map(service => service.id);
      },
      error: () => {
        this.message = 'Erreur lors du chargement des services existants.';
      },
    });
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
    if (this.existingServices.includes(provisionIdNum)) {
      this.message = 'Ce service est déjà associé.';
      return;
    }

    const dto: ProvisionDto[] = [{ provisionId: provisionIdNum }];

    this._providersService
      .attachServiceToConnectedProvider(dto)
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        tap({
          next: () => {
            this.message = 'Service ajouté avec succès !';
            this.existingServices.push(provisionIdNum);
            // this.loadExistingServices();
          },
          error: () => {
            this.message = "Erreur lors de l'ajout du service.";
          },
        })
      )
      .subscribe();
  }
}
