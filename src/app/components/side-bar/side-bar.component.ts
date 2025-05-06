// import { Component, ViewChild, AfterViewInit, OnDestroy, ChangeDetectorRef, NgZone } from '@angular/core';
// import { MatSidenav } from '@angular/material/sidenav';
// import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
// import { Observable, Subscription } from 'rxjs';
// import { CommonServiceService } from 'src/app/Services/common-service.service';
// import { DatePipe } from '@angular/common';

// @Component({
//   selector: 'app-side-bar',
//   templateUrl: './side-bar.component.html',
//   styleUrls: ['./side-bar.component.scss']
// })
// export class SideBarComponent implements AfterViewInit, OnDestroy {
//   @ViewChild('sidenav') sidenav!: MatSidenav;
//   isHandset$: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
//   private isOpenSubscription!: Subscription;
//   todaysTasks: any[] = [];
//   currentDate: Date = new Date();
//   constructor(private breakpointObserver: BreakpointObserver, private sidenavService: CommonServiceService, private cdr: ChangeDetectorRef, private taskUpdateService: CommonServiceService, private datePipe: DatePipe, private ngZone:NgZone) {
//     this.loadTasks(); // Load tasks initially

//     this.taskUpdateService.taskAdded$.subscribe(() => {
//       this.ngZone.run(()=>{
//         // this.loadTasks(); // Reload tasks when a new task is added
//          this.loadTasks(); // Make sure UI is updated
//       })
     
//     });

//   }
//   ngOnInit(){
//     this.currentDate = new Date();
//     this.loadTasks(); 
//   }
 
//   loadTasks() {
//     const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
//     const today = new Date();
//     const currentFormattedDate = this.formatDate(today); // Get the current date in 'YYYY-MM-DD' format
//     console.log('All Tasks from localStorage:', tasks);
//     this.todaysTasks = tasks.filter((task: any) => {
//       if (task.startDate) {
//         const taskStartDate = new Date(task.startDate);
//         const taskFormattedDate = this.formatDate(taskStartDate); // Convert startDate to 'YYYY-MM-DD' format
//         return taskFormattedDate === currentFormattedDate;
//       }
//       return false;
//     });
//     console.log('Filtered Today\'s Tasks:', this.todaysTasks);
  
//   }

//   formatDate(date: Date): string {
//     const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' };
//     return date.toLocaleDateString('en-US', options);
//   }

//   ngAfterViewInit() {
//     this.isOpenSubscription = this.sidenavService.isOpen().subscribe(isOpen => {
//       if (isOpen) {
//         setTimeout(() => this.sidenav.open());
//       } else {
//         setTimeout(() => this.sidenav.close());
//       }
//     });

//     this.isHandset$.subscribe(result => {
//       if (result.matches) {
//         setTimeout(() => this.sidenav.close());
//       } else {
//         setTimeout(() => this.sidenav.open());
//       }
//     });
//   }

//   closeSideNav() {
//     this.sidenav.close();
//   }
//   onEditClick() {
  
//   }
//   onDeleteClick() {
  
//   }
//   ngOnDestroy() {
//     this.isOpenSubscription.unsubscribe();
//   }

// }


// import { Component, ViewChild, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
// import { MatSidenav } from '@angular/material/sidenav';
// import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
// import { Observable, Subscription } from 'rxjs';
// import { CommonServiceService } from 'src/app/Services/common-service.service';
// import { DatePipe } from '@angular/common';

// @Component({
//   selector: 'app-side-bar',
//   templateUrl: './side-bar.component.html',
//   styleUrls: ['./side-bar.component.scss']
// })
// export class SideBarComponent implements AfterViewInit, OnDestroy {
//   @ViewChild('sidenav') sidenav!: MatSidenav;
//   isHandset$: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
//   private isOpenSubscription!: Subscription;

//   todaysTasks: any[] = [];
//   currentDate: Date = new Date();

//   constructor(
//     private breakpointObserver: BreakpointObserver,
//     private sidenavService: CommonServiceService,
//     private cdr: ChangeDetectorRef,
//     private taskUpdateService: CommonServiceService,
//     private datePipe: DatePipe
//   ) {
//     this.loadTasks(); // Load tasks initially

//     // Subscribe to service event when a task is added
//     this.taskUpdateService.taskAdded$.subscribe(() => {
//       this.loadTasks();
//     });
//   }

//   ngOnInit() {
//     this.currentDate = new Date();
//   }

//   ngAfterViewInit() {
//     this.isOpenSubscription = this.sidenavService.isOpen().subscribe((isOpen) => {
//       if (isOpen) {
//         setTimeout(() => this.sidenav.open());
//       } else {
//         setTimeout(() => this.sidenav.close());
//       }
//     });

//     this.isHandset$.subscribe((result) => {
//       if (result.matches) {
//         setTimeout(() => this.sidenav.close());
//       } else {
//         setTimeout(() => this.sidenav.open());
//       }
//     });
//   }

//   loadTasks() {
//     const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
//     const today = this.getDateOnly(new Date());

//     console.log('All Tasks from localStorage:', tasks);
//     console.log('Today (Local):', today);

//     this.todaysTasks = tasks
//       .filter((task: any) => {
//         if (task.startDate) {
//           const taskDate = this.getDateOnly(new Date(task.startDate));
//           return taskDate === today;
//         }
//         return false;
//       })
//       .sort((a: any, b: any) => {
//         const timeA = this.convertTo24HourDate(a.startTime);
//         const timeB = this.convertTo24HourDate(b.startTime);
//         return timeA.getTime() - timeB.getTime(); // Sort in ascending order
//       });

//     console.log("Filtered and Sorted Today's Tasks:", this.todaysTasks);
//   }

//   // Returns 'YYYY-MM-DD' format from a Date object
//   getDateOnly(date: Date): string {
//     return (
//       date.getFullYear() +
//       '-' +
//       String(date.getMonth() + 1).padStart(2, '0') +
//       '-' +
//       String(date.getDate()).padStart(2, '0')
//     );
//   }

//   // Converts 'HH:MM AM/PM' to a 24-hour Date object
//   convertTo24HourDate(timeString: string): Date {
//     const today = new Date();
//     const [time, modifier] = timeString.split(' ');
//     let [hours, minutes] = time.split(':').map(Number);

//     if (modifier === 'PM' && hours < 12) hours += 12;
//     if (modifier === 'AM' && hours === 12) hours = 0;

//     const result = new Date(today);
//     result.setHours(hours, minutes, 0, 0);
//     return result;
//   }

//   closeSideNav() {
//     this.sidenav.close();
//   }

//   onEditClick() {
//     // Logic for edit
//   }

//   onDeleteClick() {
//     // Logic for delete
//   }

//   ngOnDestroy() {
//     this.isOpenSubscription.unsubscribe();
//   }
// }







import { Component, ViewChild, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog
import { Observable, Subscription } from 'rxjs';
import { CommonServiceService } from 'src/app/Services/common-service.service';
import { DatePipe } from '@angular/common';
import { TaskDetailComponent } from '../task-detail/task-detail.component';
import { TaskdetailsdialogcomponentComponent } from 'src/app/dialogs/taskdetailsdialogcomponent/taskdetailsdialogcomponent.component';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isHandset$: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  private isOpenSubscription!: Subscription;

  todaysTasks: any[] = [];
  currentDate: Date = new Date();

  constructor(
    private breakpointObserver: BreakpointObserver,
    private sidenavService: CommonServiceService,
    private cdr: ChangeDetectorRef,
    private taskUpdateService: CommonServiceService,
    private datePipe: DatePipe,
    private dialog: MatDialog // Inject MatDialog
  ) {
    this.loadTasks(); // Load tasks initially

    // Subscribe to service event when a task is added
    this.taskUpdateService.taskAdded$.subscribe(() => {
      this.loadTasks();
    });
  }

  ngOnInit() {
    this.currentDate = new Date();
  }

  ngAfterViewInit() {
    this.isOpenSubscription = this.sidenavService.isOpen().subscribe((isOpen) => {
      if (isOpen) {
        setTimeout(() => this.sidenav.open());
      } else {
        setTimeout(() => this.sidenav.close());
      }
    });

    this.isHandset$.subscribe((result) => {
      if (result.matches) {
        setTimeout(() => this.sidenav.close());
      } else {
        setTimeout(() => this.sidenav.open());
      }
    });
  }

  loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const today = this.getDateOnly(new Date());

    this.todaysTasks = tasks
      .filter((task: any) => {
        if (task.startDate) {
          const taskDate = this.getDateOnly(new Date(task.startDate));
          return taskDate === today;
        }
        return false;
      })
      .sort((a: any, b: any) => {
        const timeA = this.convertTo24HourDate(a.startTime);
        const timeB = this.convertTo24HourDate(b.startTime);
        return timeA.getTime() - timeB.getTime(); // Sort in ascending order
      });
  }

  openTaskDetails(task: any) {
    const dialogRef = this.dialog.open(TaskdetailsdialogcomponentComponent, {
      width: '600px', // Adjust dialog width as needed
      data: { task: task } // Pass the task here
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle any action after the dialog is closed (optional)
    });
  }

  // Other existing methods

  getDateOnly(date: Date): string {
    return (
      date.getFullYear() +
      '-' +
      String(date.getMonth() + 1).padStart(2, '0') +
      '-' +
      String(date.getDate()).padStart(2, '0')
    );
  }

  convertTo24HourDate(timeString: string): Date {
    const today = new Date();
    const [time, modifier] = timeString.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;

    const result = new Date(today);
    result.setHours(hours, minutes, 0, 0);
    return result;
  }

  ngOnDestroy() {
    this.isOpenSubscription.unsubscribe();
  }
}
