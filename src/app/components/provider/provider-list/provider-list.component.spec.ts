import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';  // <-- Utilisation de provideHttpClient
import { ProviderListComponent } from './provider-list.component';
import { CommonModule } from '@angular/common';  // <-- Importation de CommonModule pour les composants Angular de base

describe('ProviderListComponent', () => {
  let component: ProviderListComponent;
  let fixture: ComponentFixture<ProviderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ProviderListComponent], // <-- Utiliser CommonModule en plus pour les directives de base
      providers: [provideHttpClient()], // <-- Fournir HttpClient dans les tests
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});