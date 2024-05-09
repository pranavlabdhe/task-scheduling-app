import { Component, ViewChild, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { CommonServiceService } from 'src/app/Services/common-service.service';
import { DatePipe } from '@angular/common';

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
  constructor(private breakpointObserver: BreakpointObserver, private sidenavService: CommonServiceService, private cdr: ChangeDetectorRef, private taskUpdateService: CommonServiceService, private datePipe: DatePipe) {
    this.loadTasks(); // Load tasks initially

    this.taskUpdateService.taskAdded$.subscribe(() => {
      this.loadTasks(); // Reload tasks when a new task is added
    });
  }
  ngOnInit(){
    this.currentDate = new Date();
  }
  loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const today = new Date();
    const currentFormattedDate = this.formatDate(today); // Get the current date in 'YYYY-MM-DD' format

    this.todaysTasks = tasks.filter((task: any) => {
      if (task.startDate) {
        const taskStartDate = new Date(task.startDate);
        const taskFormattedDate = this.formatDate(taskStartDate); // Convert startDate to 'YYYY-MM-DD' format
        return taskFormattedDate === currentFormattedDate;
      }
      return false;
    });

  }

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  ngAfterViewInit() {
    this.isOpenSubscription = this.sidenavService.isOpen().subscribe(isOpen => {
      if (isOpen) {
        setTimeout(() => this.sidenav.open());
      } else {
        setTimeout(() => this.sidenav.close());
      }
    });

    this.isHandset$.subscribe(result => {
      if (result.matches) {
        setTimeout(() => this.sidenav.close());
      } else {
        setTimeout(() => this.sidenav.open());
      }
    });
  }

  closeSideNav() {
    this.sidenav.close();
  }
  onEditClick() {
  
  }
  onDeleteClick() {
  
  }
  ngOnDestroy() {
    this.isOpenSubscription.unsubscribe();
  }

}
