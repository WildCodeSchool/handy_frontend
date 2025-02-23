import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';  // <-- Utiliser provideHttpClient
import { ProviderFacadeService } from './provider-facade.service';
import { ApiService } from '../../core/api.service';  // Assure-toi du bon chemin
import { ProviderStoreService } from './provider-store.service';  // Assure-toi du bon chemin

describe('ProviderFacadeService', () => {
  let service: ProviderFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProviderFacadeService,
        ApiService,
        ProviderStoreService,
        provideHttpClient()  // <-- Remplacer HttpClientModule par provideHttpClient
      ],
    });
    service = TestBed.inject(ProviderFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});