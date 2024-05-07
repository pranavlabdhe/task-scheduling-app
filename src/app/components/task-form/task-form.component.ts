import { Component } from '@angular/core';
import { WeeklyDialogComponent } from 'src/app/dialogs/weekly-dialog/weekly-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import necessary modules
import { DatePipe } from '@angular/common';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/DD/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MM/YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})

export class TaskFormComponent {
  panelOpenState = false;
  taskForm: FormGroup;
  selectedWeeklyData: any;
  weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog,private datePipe: DatePipe,private dateAdapter: DateAdapter<Date>) {
    this.taskForm = this.formBuilder.group({
      taskName: ['', Validators.required],
      frequency: ['hourly'],
      startDate: [null],
      endDate: [null],
      daysOfWeek: [[]],
      startTime: ['', Validators.required],
      endTime:['', Validators.required],
      selectedWeeklyData: [null],
      description: [''] 
    });
    this.dateAdapter.setLocale('en-IN'); 
  }
  //  Angular editor code
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: false,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    // upload: (file: File) => { ... }
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize', 'insertImage',
      'insertVideo','link',
      'unlink',
      'insertImage',
      'insertVideo',
      'insertHorizontalRule',
      'removeFormat','customClasses','toggleEditorMode']
    ],
};
  ngOnInit() {
    this.dateAdapter.setLocale('en-IN'); 
  }
  openWeeklyDialog(): void {
    const dialogRef = this.dialog.open(WeeklyDialogComponent, {
      width: '416px'
    });
    dialogRef.componentInstance.dialogClosed.subscribe(result => {
      if (result) {
        if (result.startDate && (result.option === 'never' || (result.option === 'ends' && result.endDate && result.daysOfWeek && result.daysOfWeek.length > 0))) {
          this.selectedWeeklyData = result;
          this.taskForm.patchValue({ selectedWeeklyData: result }); // to Update selectedWeeklyData in the form
        } else {
          alert('Please fill all details in the Weekly dialog');
        }
      }
    });
  }
  formatDateString(date: any): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy')!;
  }

  onSubmit() {
    if (this.taskForm.valid) {
    console.log(this.taskForm.value);
  }else {
    alert('Kindly fill valid details')
    this.taskForm.markAllAsTouched();
  }
  
}
}
