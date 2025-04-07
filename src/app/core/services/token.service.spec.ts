

 import { TestBed } from '@angular/core/testing';
import { TokenService } from '../../core/services/token.service';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenService]
    });
    service = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save and retrieve a token', () => {
    const mockToken = 'test-token';
    service.setToken(mockToken);
    expect(service.getToken()).toBe(mockToken);
  });
});
