import { Component, inject } from '@angular/core';
import { ProviderFacadeService } from '../../services/provider-facade.service';
import { AppProvider } from '../../models/provider';
import { map, Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ProductComponent } from '../product/product.component';

import { ProductForCreation } from '../../models/productCreation';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [AsyncPipe, CommonModule, ProductComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  private _facadeProvisionService: ProviderFacadeService = inject(ProviderFacadeService);
  products$: Observable<AppProvider[]> = this._facadeProvisionService.getAll$();

  products: AppProvider | undefined;
  selectedItem!: AppProvider | null;

  serviceList = [
    { imgUrl: 'assets/clening.jpg', nameService: 'Service 1' },
    { imgUrl: 'assets/shopping.jpg', nameService: 'Service 2' },
    { imgUrl: 'assets/speed.jpg', nameService: 'Service 3' },
  ];

  CloseDetails(): void {
    this.selectedItem = null;
    console.log('Bouton cliqué');
  }
  onSelectProduct(product: AppProvider): void {
    this.selectedItem = product;
    console.log('Item selected:', this.selectedItem);
  }

  onCreateProduct(newProduct: ProductForCreation = { name: 'Nouveau produit', coeff: 0 }): void {
    console.log('Nouveau produit créé:', newProduct);
    this.products$ = this._facadeProvisionService.getAll$();
  }

  onDeleteProduct(productId: number): void {
    console.log('Produit supprimé:', productId);
    this.products$ = this.products$.pipe(map(products => products.filter(product => product.id !== productId)));
    this.products$ = this._facadeProvisionService.getAll$();
  }
}
