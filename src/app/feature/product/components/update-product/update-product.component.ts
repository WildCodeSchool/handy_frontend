import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AppProvider } from '../../models/provider';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss',
})
export class UpdateProductComponent {
  @Input() product!: AppProvider;
  @Output() closeDetails = new EventEmitter<void>();

  // isAdmin = this.checkAdminRole();
  constructor(private _productService: ApiService) {}

  checkAdminRole(): boolean {
    return localStorage.getItem('userRole') === 'admin';
  }

  updateProductDetails(): void {
    const updatedProduct = { ...this.product };

    this._productService.updateProvision$(this.product.id, updatedProduct).subscribe({
      next: res => console.log(' le Produit a été mis à jour', res),
      error: err => console.error('Erreur lors de la mise à jour', err),
    });
  }
  CloseDetails(): void {
    this.closeDetails.emit();
  }
}
