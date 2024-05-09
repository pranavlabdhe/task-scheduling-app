import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllTasksComponent } from './list-all-tasks.component';

describe('ListAllTasksComponent', () => {
  let component: ListAllTasksComponent;
  let fixture: ComponentFixture<ListAllTasksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListAllTasksComponent]
    });
    fixture = TestBed.createComponent(ListAllTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
