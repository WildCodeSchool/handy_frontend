import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderProfilComponent } from './provider-profil.component';

describe('ProviderProfilComponent', () => {
  let component: ProviderProfilComponent;
  let fixture: ComponentFixture<ProviderProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderProfilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
