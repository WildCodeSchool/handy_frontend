import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateProductComponent } from './create-product.component';
import { ProviderFacadeService } from '../../services/provider-facade.service';
import { UserStoreService } from '../../../../core/services/user-store.service';
import { of } from 'rxjs';

describe('CreateProductComponent (unit)', () => {
  let component: CreateProductComponent;
  let fixture: ComponentFixture<CreateProductComponent>;
  let mockProviderFacadeService: any;
  let mockUserStore: any;

  beforeEach(async () => {
    mockProviderFacadeService = {
        post$: jest.fn().mockReturnValue(of({ name: 'Test', coeff: 1 }))
      };

      mockUserStore = {
        hasRole$: jest.fn().mockReturnValue(of(true))
      };

    await TestBed.configureTestingModule({
      imports: [CreateProductComponent],
      providers: [
        { provide: ProviderFacadeService, useValue: mockProviderFacadeService },
        { provide: UserStoreService, useValue: mockUserStore }  
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should call service and emit product on submit', () => {
    jest.spyOn(component.productCreated, 'emit');

    component.newProduct = { name: 'Test', coeff: 1 };
    component.onSubmit();

    expect(mockProviderFacadeService.post$).toHaveBeenCalledWith({ name: 'Test', coeff: 1 });
    expect(component.productCreated.emit).toHaveBeenCalledWith({ name: 'Test', coeff: 1 });
    expect(component.successMessageUpdate).toBe('Produit créé avec succès !');
  });
});

