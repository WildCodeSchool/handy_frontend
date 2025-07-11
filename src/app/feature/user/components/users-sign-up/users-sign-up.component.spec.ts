import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersSignUpComponent } from './users-sign-up.component';

describe('UsersSignUpComponent', () => {
  let component: UsersSignUpComponent;
  let fixture: ComponentFixture<UsersSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersSignUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
