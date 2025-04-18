import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AppProvider } from '../../models/provider';
import { UserStoreService } from 'src/app/core/services/user-store.service';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [CommonModule, FormsModule, AsyncPipe],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss',
})
export class UpdateProductComponent {
  successMessageUpdate: string | null = null;

  _productService: ApiService = inject(ApiService);
  private _userStore = inject(UserStoreService);

  @Input() product!: AppProvider;
  @Output() closeDetails = new EventEmitter<void>();

  isAdmin$ = this._userStore.hasRole$('ROLE_ADMIN');
  

  updateProductDetails(): void {
    const updatedProduct = { ...this.product };

    this._productService.updateProvision$(this.product.id, updatedProduct).subscribe({
      next: res => console.log(' le Produit a été mis à jour', res),
      error: err => console.error('Erreur lors de la mise à jour', err),
    });
    this.successMessageUpdate = 'Produit mis à jour avec succès !';
  }
  CloseDetails(): void {
    this.closeDetails.emit();
  }
}
