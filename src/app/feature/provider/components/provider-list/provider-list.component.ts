import { Component, inject } from '@angular/core';
import { ProviderFacadeService } from '../../services/provider-facade.service';
import { Observable } from 'rxjs';
import { AppProvider } from '../../models/provider';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-provider-list',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './provider-list.component.html',
  styleUrl: './provider-list.component.scss',
})
export class ProviderListComponent {
  private _facadeProvisionService: ProviderFacadeService = inject(ProviderFacadeService);
  provisions$: Observable<AppProvider[]> = this._facadeProvisionService.getAll$();

  serviceList = [
    { imgUrl: 'assets/clening.jpg', nameService: 'Service 1' },
    { imgUrl: 'assets/clening.jpg', nameService: 'Service 2' },
    { imgUrl: 'assets/clening.jpg', nameService: 'Service 3' },
  ];
}
