import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskdetailsdialogcomponentComponent } from './taskdetailsdialogcomponent.component';

describe('TaskdetailsdialogcomponentComponent', () => {
  let component: TaskdetailsdialogcomponentComponent;
  let fixture: ComponentFixture<TaskdetailsdialogcomponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskdetailsdialogcomponentComponent]
    });
    fixture = TestBed.createComponent(TaskdetailsdialogcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
