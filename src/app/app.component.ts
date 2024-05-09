import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SearchedTaskDetailsComponent } from './dialogs/searched-task-details/searched-task-details.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'task-scheduling-app';
  myControl = new FormControl('');
  tasks: any[] = JSON.parse(localStorage.getItem('tasks') || '[]');

  constructor(private dialog: MatDialog, private router: Router) {}

  // Filter options for autocomplete
  get filteredOptions() {
    const searchTerm = (this.myControl.value || '').toString().toLowerCase();
    return this.tasks.filter(task => task.taskName.toLowerCase().includes(searchTerm));
  }

  // Open task details dialog
  openTaskDetails(task: any) {
    if (task) { // Check if task is not null
      this.dialog.open(SearchedTaskDetailsComponent, {
        data: {
          task
        },
        width:'416px'
      });
    }
  }
  shouldShowSidebar(): boolean {
    const currentUrl = this.router.url;
    return !(currentUrl.includes('sign-up') || currentUrl.includes('sign-in'));
  }
  shouldShowSignUp(): boolean {
    return this.router.url === '/sign-up';
  }
  
  shouldShowSignIn(): boolean {
    return this.router.url === '/sign-in';
  }
}
