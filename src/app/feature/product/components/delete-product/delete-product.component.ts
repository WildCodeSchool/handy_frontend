import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { AppProvider } from '../../models/provider';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-product.component.html',
  styleUrl: './delete-product.component.scss',
})
export class DeleteProductComponent {
  successMessageUpdate: string | null = null;

  _productService: ApiService = inject(ApiService);

  @Input() product!: AppProvider;
  @Output() productDeleted = new EventEmitter<number>();

  // isAdmin = this.checkAdminRole();
  checkAdminRole(): boolean {
    return localStorage.getItem('userRole') === 'admin';
  }
  deleteProduct(): void {
    this._productService.deleteProvision$(this.product.id).subscribe({
      next: () => {
        console.log('Produit supprimé avec succès');
        this.productDeleted.emit(this.product.id);
        this.successMessageUpdate = 'Produit supprimé avec succès !';
      },
      error: err => console.error('Erreur lors de la suppression', err),
    });
  }
}
