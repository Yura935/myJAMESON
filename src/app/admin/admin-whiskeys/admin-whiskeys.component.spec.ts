import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWhiskeysComponent } from './admin-whiskeys.component';

describe('AdminWhiskeysComponent', () => {
  let component: AdminWhiskeysComponent;
  let fixture: ComponentFixture<AdminWhiskeysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminWhiskeysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminWhiskeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
