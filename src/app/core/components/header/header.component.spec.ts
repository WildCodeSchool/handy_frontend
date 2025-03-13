import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';  
import { ActivatedRoute } from '@angular/router'; 
import { HeaderComponent } from './header.component';
import { CommonModule } from '@angular/common';  

class ActivatedRouteMock {
  snapshot = { paramMap: { get: () => 'mockParam' } }; 
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, HeaderComponent],  
      providers: [
        provideHttpClient(),  
        { provide: ActivatedRoute, useClass: ActivatedRouteMock },  
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

