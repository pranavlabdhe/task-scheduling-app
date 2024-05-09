import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchedTaskDetailsComponent } from './searched-task-details.component';

describe('SearchedTaskDetailsComponent', () => {
  let component: SearchedTaskDetailsComponent;
  let fixture: ComponentFixture<SearchedTaskDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchedTaskDetailsComponent]
    });
    fixture = TestBed.createComponent(SearchedTaskDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
