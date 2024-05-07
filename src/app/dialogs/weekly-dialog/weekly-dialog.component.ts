

import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-weekly-dialog',
  templateUrl: './weekly-dialog.component.html',
  styleUrls: ['./weekly-dialog.component.scss']
})
export class WeeklyDialogComponent {
  @Output() dialogClosed = new EventEmitter<any>();
  weeklyForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.weeklyForm = this.fb.group({
      option: ['never', Validators.required],
      startDate: [null],
      endDate: [null],
      daysOfWeek: [[]]
    });
  }

  closeDialog() {
    if (this.weeklyForm.invalid) {
      alert('Please fill all details');
      return;
    }
    this.dialogClosed.emit(this.weeklyForm.value);
  }
  
}
