import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';  // <-- Utilisation de provideHttpClient
import { ActivatedRoute } from '@angular/router';  // <-- Importation de ActivatedRoute
import { HeaderComponent } from './header.component';
import { CommonModule } from '@angular/common';  // <-- Importation de CommonModule pour les directives Angular de base

// Création d'un ActivatedRoute mocké
class ActivatedRouteMock {
  // Si tu as besoin de mocks spécifiques, tu peux les ajouter ici
  snapshot = { paramMap: { get: () => 'mockParam' } }; // Exemple de paramètre pour les tests
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, HeaderComponent],  // <-- Utilisation de CommonModule et du composant
      providers: [
        provideHttpClient(),  // Fournir HttpClient pour les tests
        { provide: ActivatedRoute, useClass: ActivatedRouteMock },  // Fournir le mock pour ActivatedRoute
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

