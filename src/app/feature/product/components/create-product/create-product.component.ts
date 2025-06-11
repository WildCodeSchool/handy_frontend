import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProviderFacadeService } from '../../services/provider-facade.service';
import { ProductForCreation } from '../../models/productCreation';
import { UserStoreService } from 'src/app/core/services/user-store.service';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss',
})
export class CreateProductComponent {
  successMessageUpdate: string | null = null;

  @Output() productCreated = new EventEmitter<ProductForCreation>();

  newProduct: ProductForCreation = { name: '', coeff: 0 };

  private _productFacadeService = inject(ProviderFacadeService);
  private _userStore = inject(UserStoreService);

  isAdmin$ = this._userStore.hasRole$('ROLE_ADMIN');

  onSubmit(): void {
    this._productFacadeService.post$(this.newProduct).subscribe({
      next: (res: ProductForCreation) => {
        console.log('Produit créé avec succès:', res);
        this.productCreated.emit(res);
      },
    });
    this.successMessageUpdate = 'Produit créé avec succès !';
  }
}
