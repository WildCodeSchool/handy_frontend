import { Component, inject } from '@angular/core';
import { ProviderFacadeService } from '../../services/provider-facade.service';
import { AppProvider } from '../../models/provider';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  private _facadeProvisionService: ProviderFacadeService = inject(ProviderFacadeService);
  products$: Observable<AppProvider[]> = this._facadeProvisionService.getAll$();

  serviceList = [
    { imgUrl: 'assets/clening.jpg', nameService: 'Service 1' },
    { imgUrl: 'assets/clening.jpg', nameService: 'Service 2' },
    { imgUrl: 'assets/clening.jpg', nameService: 'Service 3' },
  ];
}
