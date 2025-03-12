import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponent } from '../../../../feature/product/components/product-list/product-list.component';
import { provideHttpClient } from '@angular/common/http';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListComponent], 
      providers: [
        provideHttpClient(), 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
