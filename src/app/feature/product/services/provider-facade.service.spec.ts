import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';  
import { ProviderFacadeService } from './provider-facade.service';
import { ApiService } from '../../../feature/provider/services/api.service';  
import { ProviderStoreService } from '../../../feature/provider/services/provider-store.service';  

describe('ProviderFacadeService', () => {
  let service: ProviderFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProviderFacadeService,
        ApiService,
        ProviderStoreService,
        provideHttpClient()  
      ],
    });
    service = TestBed.inject(ProviderFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});