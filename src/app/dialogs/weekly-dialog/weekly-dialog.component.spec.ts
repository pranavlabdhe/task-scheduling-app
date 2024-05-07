import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyDialogComponent } from './weekly-dialog.component';

describe('WeeklyDialogComponent', () => {
  let component: WeeklyDialogComponent;
  let fixture: ComponentFixture<WeeklyDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeeklyDialogComponent]
    });
    fixture = TestBed.createComponent(WeeklyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
