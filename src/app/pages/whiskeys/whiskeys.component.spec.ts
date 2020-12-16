import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhiskeysComponent } from './whiskeys.component';

describe('WhiskeysComponent', () => {
  let component: WhiskeysComponent;
  let fixture: ComponentFixture<WhiskeysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhiskeysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhiskeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
