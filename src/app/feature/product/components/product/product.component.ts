import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { AppProvider } from '../../models/provider';
import { FormsModule } from '@angular/forms';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  @Input() product!: AppProvider | null;
  @Output() closeDetails = new EventEmitter<void>();

  constructor(
    private _productService: ApiService,
    private _route: ActivatedRoute
  ) {}

  CloseDetails(): void {
    this.closeDetails.emit();
  }

  updateProductDetails(): void {
    if (this.product) {
      console.log('Données du produit avant la mise à jour :', this.product);

      const updatedProduct: any = {
        id: this.product.id,
        name: this.product.name,
        coeff: this.product.coeff,
      };

      this._productService
        .updateProvision$(this.product.id, updatedProduct)
        .pipe(
          tap((updatedProduct: any) => {
            console.log('Détails du produit mis à jour avec succès :', updatedProduct);
          }),
          catchError(error => {
            console.error('Échec de la mise à jour des détails du produit :', error);
            return of(null);
          })
        )
        .subscribe();
    }
  }
}
