import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CreateProductComponent } from './create-product.component';
import { ProviderFacadeService } from '../../services/provider-facade.service';
import { UserStoreService } from '../../../../core/services/user-store.service';
import { of } from 'rxjs';

describe('CreateProductComponent (integration)', () => {
  let component: CreateProductComponent;
  let fixture: ComponentFixture<CreateProductComponent>;
  let mockProviderFacadeService: any;

  beforeEach(async () => {
    mockProviderFacadeService = {
      post$: jest.fn().mockReturnValue(of({ name: 'IntegrationTest', coeff: 5 }))
    };

    await TestBed.configureTestingModule({
      imports: [CreateProductComponent, FormsModule],
      providers: [
        { provide: ProviderFacadeService, useValue: mockProviderFacadeService },
        { provide: UserStoreService, useValue: { hasRole$: () => of(true) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should update product and show success message after form submit', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const inputName: HTMLInputElement = compiled.querySelector('input[name="name"]')!;
    inputName.value = 'IntegrationTest';
    inputName.dispatchEvent(new Event('input'));

    const inputCoeff: HTMLInputElement = compiled.querySelector('input[name="coeff"]')!;
    inputCoeff.value = '5';
    inputCoeff.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    component.onSubmit();
    fixture.detectChanges();

    expect(mockProviderFacadeService.post$).toHaveBeenCalled();
    expect(compiled.textContent).toContain('Produit créé avec succès !');
  });
});
