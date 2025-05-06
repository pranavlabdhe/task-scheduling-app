// import { Component, Inject } from '@angular/core';
// import { MAT_DIALOG_DATA ,MatDialogRef} from '@angular/material/dialog';
// import { Router } from '@angular/router';
// import { CommonServiceService } from 'src/app/Services/common-service.service';
// @Component({
//   selector: 'app-taskdetailsdialogcomponent',
//   templateUrl: './taskdetailsdialogcomponent.component.html',
//   styleUrls: ['./taskdetailsdialogcomponent.component.scss']
// })
// export class TaskdetailsdialogcomponentComponent {
//   task: any;

//   constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<TaskdetailsdialogcomponentComponent>, private router: Router, private service: CommonServiceService) {
//     this.task = data.task;
//     console.log('Task details:', this.task); 
//   }

//   isRecurringWeekly(): boolean {
//     return this.task && this.task.frequency === 'weekly' && this.task.selectedWeeklyData;
//   }

//   getRecurringDaysOfWeek(): string {
//     if (this.isRecurringWeekly()) {
//       const daysOfWeek = this.task.selectedWeeklyData.daysOfWeek.map((day: string) => {
//         return day.substr(0, 3); // Shorten the day to three letters
//       });

//       const startDate = new Date(this.task.selectedWeeklyData.startDate);
//       const endDate = new Date(this.task.selectedWeeklyData.endDate);

//       const formattedDaysOfWeek = this.formatDaysOfWeek(daysOfWeek);
//       return `Weekly on ${formattedDaysOfWeek} Until ${endDate.toDateString()}`;
//     }
//     return '';
//   }

//   formatDaysOfWeek(daysOfWeek: string[]): string {
//     if (daysOfWeek.length === 0) return '';
//     if (daysOfWeek.length === 1) return daysOfWeek[0];

//     const lastDay = daysOfWeek.pop();
//     return `${daysOfWeek.join(', ')} and ${lastDay}`;
//   }

//   onEditClick() {
//     this.dialogRef.close({ action: 'edit', task: this.task });
//     this.router.navigate([`/main-view/edit-task/${this.task.id}`], {
//       state: { taskId: this.task.id }
//     });
//   }
//   onDeleteClick() {
//     // Delete the task from localStorage
//     let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
//     tasks = tasks.filter((task: any) => task.id !== this.task.id);
//     localStorage.setItem('tasks', JSON.stringify(tasks));
  
//     // Notify the service about the deleted task
//     // this.service.deleteTask(this.task.id);
  
//     // Close the dialog
//     this.dialogRef.close({ action: 'delete', task: this.task });
//     window.location.reload();

//   }
  
  
// }


import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonServiceService } from 'src/app/Services/common-service.service';
import { MatDialog } from '@angular/material/dialog';
// import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component'; // Import the ConfirmDialogComponent

@Component({
  selector: 'app-taskdetailsdialogcomponent',
  templateUrl: './taskdetailsdialogcomponent.component.html',
  styleUrls: ['./taskdetailsdialogcomponent.component.scss']
})
export class TaskdetailsdialogcomponentComponent {
  task: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<TaskdetailsdialogcomponentComponent>,
    private router: Router,
    private service: CommonServiceService,
    private dialog: MatDialog // Inject MatDialog for opening the confirmation dialog
  ) {
    this.task = data.task;
    console.log('Task details:', this.task);
  }

  isRecurringWeekly(): boolean {
    return this.task && this.task.frequency === 'weekly' && this.task.selectedWeeklyData;
  }

  getRecurringDaysOfWeek(): string {
    if (this.isRecurringWeekly()) {
      const daysOfWeek = this.task.selectedWeeklyData.daysOfWeek.map((day: string) => {
        return day.substr(0, 3); // Shorten the day to three letters
      });

      const startDate = new Date(this.task.selectedWeeklyData.startDate);
      const endDate = new Date(this.task.selectedWeeklyData.endDate);

      const formattedDaysOfWeek = this.formatDaysOfWeek(daysOfWeek);
      return `Weekly on ${formattedDaysOfWeek} Until ${endDate.toDateString()}`;
    }
    return '';
  }

  formatDaysOfWeek(daysOfWeek: string[]): string {
    if (daysOfWeek.length === 0) return '';
    if (daysOfWeek.length === 1) return daysOfWeek[0];

    const lastDay = daysOfWeek.pop();
    return `${daysOfWeek.join(', ')} and ${lastDay}`;
  }

  onEditClick() {
    this.dialogRef.close({ action: 'edit', task: this.task });
    this.router.navigate([`/main-view/edit-task/${this.task.id}`], {
      state: { taskId: this.task.id }
    });
  }

  onDeleteClick() {
    // Delete the task from localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks = tasks.filter((task: any) => task.id !== this.task.id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  
    // Notify the service about the deleted task
    // this.service.deleteTask(this.task.id);
  
    // Close the dialog
    this.dialogRef.close({ action: 'delete', task: this.task });
    window.location.reload();

  }

  // deleteTaskFromStorage() {
  //   let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  //   tasks = tasks.filter((task: any) => task.id !== this.task.id);
  //   localStorage.setItem('tasks', JSON.stringify(tasks));

  //   // Notify the service about the deleted task
  //   this.service.deleteTask(this.task.id); // Ensure this method is defined in your service

  //   // Close the dialog
  //   this.dialogRef.close({ action: 'delete', task: this.task });
  // }
}
