import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-weekly-dialog',
  templateUrl: './weekly-dialog.component.html',
  styleUrls: ['./weekly-dialog.component.scss']
})
export class WeeklyDialogComponent {
  @Output() dialogClosed = new EventEmitter<any>();
  weeklyForm: FormGroup;

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.weeklyForm = this.fb.group({
      option: [data.selectedWeeklyData.option, Validators.required],
      startDate: [data.selectedWeeklyData.startDate],
      endDate: [data.selectedWeeklyData.endDate],
      daysOfWeek: [data.selectedWeeklyData.daysOfWeek]
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
