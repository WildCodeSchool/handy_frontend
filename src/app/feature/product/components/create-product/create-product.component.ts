import { Component, EventEmitter, inject, Output } from '@angular/core';
// import { AppProvider } from '../../models/provider';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProviderFacadeService } from '../../services/provider-facade.service';
import { ProductForCreation } from '../../models/productCreation';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss',
})
export class CreateProductComponent {
  @Output() productCreated = new EventEmitter<ProductForCreation>();

  newProduct: ProductForCreation = { name: '', coeff: 0 };

  private _productFacadeService = inject(ProviderFacadeService);

   // isAdmin = this.checkAdminRole();
   checkAdminRole(): boolean {
    return localStorage.getItem('userRole') === 'admin';
  }
  onSubmit(): void {
    console.log('Produit avant envoi:', this.newProduct);

    this._productFacadeService.post$(this.newProduct).subscribe({
      next: (res: ProductForCreation) => {
        console.log('Produit créé avec succès:', res);
        this.productCreated.emit(res);
      },
      error: (err: any) => console.error('Erreur lors de la création du produit', err),
    });
  }
}
