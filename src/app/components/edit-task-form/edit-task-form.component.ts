import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CommonServiceService } from 'src/app/Services/common-service.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormGroupDirective } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { WeeklyDialogComponent } from 'src/app/dialogs/weekly-dialog/weekly-dialog.component';

@Component({
  selector: 'app-edit-task-form',
  templateUrl: './edit-task-form.component.html',
  styleUrls: ['./edit-task-form.component.scss']
})
export class EditTaskFormComponent implements OnInit {
  taskForm: FormGroup;
  selectedWeeklyData: any;
  taskId!: string;
  selectedFrequency: string = 'hourly';


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private service: CommonServiceService,
    private dialog: MatDialog
  ) {
    this.taskForm = this.formBuilder.group({
      taskName: ['', Validators.required],
      frequency: ['hourly'],
      startDate: null,
      endDate: [null],
      daysOfWeek: [[]],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      status: null,
      selectedWeeklyData: this.formBuilder.group({
        option: ['never', Validators.required],
        startDate: [null],
        endDate: [null],
        daysOfWeek: [[]]
      }),
      description: ['']
    });
  }

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
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize', 'insertImage',
        'insertVideo', 'link',
        'unlink',
        'insertImage',
        'insertVideo',
        'insertHorizontalRule',
        'removeFormat', 'customClasses', 'toggleEditorMode']
    ],
  };

  // openWeeklyDialog(): void {
  //   const dialogRef = this.dialog.open(WeeklyDialogComponent, {
  //     width: '416px'
  //   });
  //   dialogRef.componentInstance.dialogClosed.subscribe(result => {
  //     if (result) {
  //       if (result.startDate && (result.option === 'never' || (result.option === 'ends' && result.endDate && result.daysOfWeek && result.daysOfWeek.length > 0))) {
  //         this.selectedWeeklyData = result;
  //         this.taskForm.patchValue({ selectedWeeklyData: result }); // to Update selectedWeeklyData in the form
  //       } else {
  //         alert('Please fill all details in the Weekly dialog');
  //       }
  //     }
  //   });
  // }
  openWeeklyDialog(): void {
    const dialogRef = this.dialog.open(WeeklyDialogComponent, {
      width: '416px',
      data: { selectedWeeklyData: this.taskForm.get('selectedWeeklyData')?.value }
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

  ngOnInit(): void {
    const taskId = history.state.taskId;
    console.log('Task ID in edit:', taskId);
  
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const task = tasks.find((t: any) => t.id === taskId);
  
    if (task) {
      this.taskId = task.id; // Set the task ID for future use
      this.taskForm.patchValue({
        taskName: task.taskName || '',
        frequency: task.frequency || 'hourly',
        startDate: task.startDate || null,
        endDate: task.endDate || null,
        daysOfWeek: task.daysOfWeek || [],
        startTime: task.startTime || '',
        endTime: task.endTime || '',
        status: task.status || null,
        description: task.description || ''
      });
    }
  }
  

  // onSubmit(formDirective: FormGroupDirective): void {
  //   if (this.taskForm.valid) {
  //     let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

  //     tasks = tasks.map((task: any) => {
  //       if (task.id === this.taskId) {
  //         return { id: task.id, ...this.taskForm.value };
  //       }
  //       return task;
  //     });

  //     localStorage.setItem('tasks', JSON.stringify(tasks));

  //     console.log('Tasks:', tasks);

  //     this.taskForm.reset();
  //     this.service.announceTaskAdded();
  //     this.router.navigate(['/main-view/tasks']);
  //   } else {
  //     alert('Kindly fill valid details');
  //     this.taskForm.markAllAsTouched();
  //   }
  // }
  onSubmit(formDirective: FormGroupDirective): void {
    if (this.taskForm.valid) {
      let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

      tasks = tasks.map((task: any) => {
        if (task.id === this.taskId) {
          const updatedTask = { id: task.id, ...this.taskForm.value };
          if (task.frequency === 'weekly') {
            const daysOfWeek = updatedTask.selectedWeeklyData.daysOfWeek.map((day: string) => {
              return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(day);
            });

            const endDate = new Date(updatedTask.selectedWeeklyData.endDate);
            endDate.setDate(endDate.getDate() + 1); // Include the last day

            const updatedEvent = {
              id: task.id,
              title: `${updatedTask.taskName} ${updatedTask.startTime}-${updatedTask.endTime}`,
              daysOfWeek: daysOfWeek,
              startRecur: updatedTask.selectedWeeklyData.startDate,
              endRecur: endDate.toISOString().split('T')[0] // Convert to 'YYYY-MM-DD' format
            };

            this.service.removeCalendarEvent(task.id); // Remove existing event
            this.service.addCalendarEvent(updatedEvent); // Add updated event
          }
          return updatedTask;
        }
        return task;
      });

      localStorage.setItem('tasks', JSON.stringify(tasks));

      console.log('Tasks:', tasks);

      this.taskForm.reset();
      this.service.announceTaskAdded();
      this.router.navigate(['/main-view/tasks']);
    } else {
      alert('Kindly fill valid details');
      this.taskForm.markAllAsTouched();
    }
  }
}
