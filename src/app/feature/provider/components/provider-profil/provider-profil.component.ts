import { Component, OnInit } from '@angular/core';
import { CalendarComponent } from 'src/app/feature/calendars/components/calendar/calendar.component';
import { UserProfilComponent } from 'src/app/feature/user/components/user-profil/user-profil.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProvidersService } from '../../service/providers.service';
import { tap } from 'rxjs';
import { ProductService } from 'src/app/feature/product/services/product.service';
import { AppProvider } from 'src/app/feature/product/models/provider';
import { ProvisionDto } from 'src/app/feature/product/models/provisionDto';

@Component({
  selector: 'app-provider-profil',
  standalone: true,
  imports: [CalendarComponent, UserProfilComponent, CommonModule, FormsModule],
  templateUrl: './provider-profil.component.html',
  styleUrl: './provider-profil.component.scss',
})
export class ProviderProfilComponent implements OnInit {
  provisions: AppProvider[] = [];
  selectedProvisionId?: number;
  message = '';

  constructor(private _productService: ProductService, private _providersService: ProvidersService) {}

  ngOnInit(): void {
    this.loadProvisions();
  }

  loadProvisions(): void {
    this._productService
      .getAllProvisions$()
      .pipe(
        tap(provisions => {
          this.provisions = provisions;
          this.message = '';
        })
      )
      .subscribe();
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
    console.log('Envoi au backend:', dto);

    this._providersService
      .attachServiceToConnectedProvider(dto)
      .pipe(
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
