import { Component, inject } from '@angular/core';
import { ProviderFacadeService } from '../../services/provider-facade.service';
import { AppProvider } from '../../models/provider';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ProductComponent } from '../product/product.component';
import { UpdateProductComponent } from '../update-product/update-product.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [AsyncPipe, CommonModule, ProductComponent, UpdateProductComponent],
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
}
