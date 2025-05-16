import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppProvider } from '../../models/provider';
import { UpdateProductComponent } from '../update-product/update-product.component';
import { CreateProductComponent } from '../create-product/create-product.component';
import { DeleteProductComponent } from '../delete-product/delete-product.component';
import { ProductForCreation } from '../../models/productCreation';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, UpdateProductComponent, CreateProductComponent, DeleteProductComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent{
  @Input() product!: AppProvider | null;
  @Output() closeDetails = new EventEmitter<void>();
 
  CloseDetails(): void {
    this.closeDetails.emit();
  }
  productCreatedHandler(product: ProductForCreation): void {
    console.log('Produit créé:', product);
  }
}
