import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDrinksComponent } from './admin-drinks.component';

describe('AdminDrinksComponent', () => {
  let component: AdminDrinksComponent;
  let fixture: ComponentFixture<AdminDrinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDrinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDrinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
