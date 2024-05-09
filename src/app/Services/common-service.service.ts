// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable, Subject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class CommonServiceService {
//   private isOpenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
//   private taskAddedSource = new Subject<void>();
//   taskAdded$ = this.taskAddedSource.asObservable();
//   private taskDeletedSource = new Subject<string>();
//   taskDeleted$ = this.taskDeletedSource.asObservable();
//   private tasksKey = 'tasks';
//   constructor() {}

//   toggle(): void {
//     this.isOpenSubject.next(!this.isOpenSubject.value);
//   }

//   isOpen(): Observable<boolean> {
//     return this.isOpenSubject.asObservable();
//   }

//   open(): void {
//     this.isOpenSubject.next(true);
//   }

//   close(): void {
//     this.isOpenSubject.next(false);
//   }
//   announceTaskAdded() {
//     this.taskAddedSource.next();
//   }
//   getTasks(): any[] {
//     const tasksStr = localStorage.getItem(this.tasksKey);
//     return tasksStr ? JSON.parse(tasksStr) : [];
//   }

// }

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { FullCalendarComponent } from '@fullcalendar/angular'; // Import FullCalendarComponent
import { EventInput } from '@fullcalendar/core'; // Import EventInput interface from FullCalendar

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
  private isOpenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private taskAddedSource = new Subject<void>();
  taskAdded$ = this.taskAddedSource.asObservable();
  private taskDeletedSource = new Subject<string>();
  taskDeleted$ = this.taskDeletedSource.asObservable();
  private tasksKey = 'tasks';
  
  // Reference to FullCalendar component
  private fullcalendar: FullCalendarComponent | undefined;

  constructor() {}

  setFullCalendar(fullcalendar: FullCalendarComponent): void {
    this.fullcalendar = fullcalendar;
  }

  toggle(): void {
    this.isOpenSubject.next(!this.isOpenSubject.value);
  }

  isOpen(): Observable<boolean> {
    return this.isOpenSubject.asObservable();
  }

  open(): void {
    this.isOpenSubject.next(true);
  }

  close(): void {
    this.isOpenSubject.next(false);
  }
  announceTaskAdded() {
    this.taskAddedSource.next();
  }
  getTasks(): any[] {
    const tasksStr = localStorage.getItem(this.tasksKey);
    return tasksStr ? JSON.parse(tasksStr) : [];
  }

  // Method to remove a calendar event by ID
  removeCalendarEvent(id: string): void {
    if (this.fullcalendar) {
      const api = this.fullcalendar.getApi();
      if (api) {
        api.getEventById(id)?.remove();
      }
    }
  }

  // Method to add a calendar event
  addCalendarEvent(event: EventInput): void {
    if (this.fullcalendar) {
      const api = this.fullcalendar.getApi();
      if (api) {
        api.addEvent(event);
      }
    }
  }
}
