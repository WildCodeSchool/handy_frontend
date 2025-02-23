import { TestBed } from '@angular/core/testing';
import { ProviderStoreService } from '../../../feature/provider/services/provider-store.service';

describe('ProviderStoreService', () => {
  let service: ProviderStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProviderStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
