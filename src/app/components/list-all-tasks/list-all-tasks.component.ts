// Everyhing is working fine
import { Component, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { TaskdetailsdialogcomponentComponent } from 'src/app/dialogs/taskdetailsdialogcomponent/taskdetailsdialogcomponent.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonServiceService } from 'src/app/Services/common-service.service';

@Component({
  selector: 'app-list-all-tasks',
  templateUrl: './list-all-tasks.component.html',
  styleUrls: ['./list-all-tasks.component.scss']
})
export class ListAllTasksComponent implements OnInit {
  @ViewChild('fullcalendar') fullcalendar!: FullCalendarComponent;
  calendarOptions: CalendarOptions;

  constructor(private dialog: MatDialog, private router: Router, private service: CommonServiceService) {
    this.calendarOptions = {
      plugins: [dayGridPlugin],
      initialView: 'dayGridMonth',
      events: [],
      eventContent: this.customizeEventContent, // Custom event content callback
      eventDidMount: this.customizeEventRender, // Custom event rendering callback
      eventClick: this.onEventClick.bind(this),
      windowResize: this.handleWindowResize.bind(this)
    };
  }
  onWindowResize() {
    this.fullcalendar?.getApi().updateSize();
  }
  handleWindowResize(view: any) {
    if (window.innerWidth <= 600) {
      view.calendar.changeView('listWeek'); // Switch to listWeek view for small screens
    } else {
      view.calendar.changeView('dayGridMonth'); // Switch back to dayGridMonth view for larger screens
    }
  }
  
  loadAllTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    // Map tasks to FullCalendar events format
    const events = tasks.flatMap((task: any) => {
      if (task.frequency === 'hourly') {
        const timeRange = `${task.startTime}-${task.endTime}`;
        return {
          id: task.id,
          title: `${task.taskName} ${timeRange}`,
          start: task.startDate,
          end: task.endDate,
          description: task.description,
          extendedProps: {
            status: task.status
          }
        };
      } else if (task.frequency === 'daily') {
        const timeRange = `${task.startTime}-${task.endTime}`;
        const recurringEvents = [];
        let startDate = new Date(task.startDate);
        startDate.setDate(startDate.getDate() + 1); // Start from the next day to avoid starting from the previous day
        startDate.setHours(0, 0, 0, 0); // Start from the beginning of the day in local time

        const endDate = new Date(); // Get current date
        endDate.setDate(endDate.getDate() + 1460); // Limit to 1460 days (4 years) into the future

        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
          recurringEvents.push({
            id: task.id,
            title: `${task.taskName} ${timeRange}`,
            start: currentDate.toISOString().split('T')[0], // Start date in 'YYYY-MM-DD' format
            end: currentDate.toISOString().split('T')[0], // End date in 'YYYY-MM-DD' format
            description: task.description,
            extendedProps: {
              status: task.status
            }
          });
          currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
        }
        return recurringEvents;
      } else if (task.frequency === 'weekly' && task.daysOfWeek.length > 0) {
        const recurringEvents = [];
        let startDate = new Date(task.startDate);
        let endDate = new Date(task.endDate);
        const timeRange = `${task.startTime}-${task.endTime}`;
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        while (startDate <= endDate) {
          const dayName = dayNames[startDate.getDay()]; // Get the day name from the day of the week number

          if (task.daysOfWeek.includes(dayName)) {
            recurringEvents.push({
              id: task.id,
              title: `${task.taskName} ${timeRange}`,
              start: startDate.toISOString(),
              end: startDate.toISOString(),
              description: task.description,
              extendedProps: {
                status: task.status
              }
            });
          }
          startDate.setDate(startDate.getDate() + 1); // Move to the next day
        }

        return recurringEvents;
      }

      return [];
    });

    this.calendarOptions.events = events; // Update the calendar events
    if (this.fullcalendar) {
      this.fullcalendar.getApi()?.removeAllEvents();
      events.forEach((event: any) => {
        this.fullcalendar.getApi()?.addEvent(event);
      });
      this.fullcalendar.getApi()?.render();
    }
  }

  ngOnInit() {
    this.loadAllTasks();

    this.service.taskDeleted$.subscribe((taskId: string) => {
      // Update the calendar events when a task is deleted
      if (this.calendarOptions.events) {
        const filteredEvents = (this.calendarOptions.events as any[]).filter((event: any) => event.id !== taskId);
        this.calendarOptions.events = filteredEvents as any; // Assign the filtered events back
        if (this.fullcalendar) {
          this.fullcalendar.getApi()?.removeAllEvents();
          filteredEvents.forEach((event) => {
            this.fullcalendar.getApi()?.addEvent(event);
          });
          this.fullcalendar.getApi()?.render();
        }
      }
    });

    window.addEventListener('resize', () => {
      this.onWindowResize();
    });

    // Set the FullCalendar reference in the service
    this.service.setFullCalendar(this.fullcalendar);

    
  }

  // Custom event content callback
  customizeEventContent(arg: any) {
    const eventEl = document.createElement('div');
    eventEl.innerHTML = arg.event.title;
    eventEl.style.fontSize = '10px'; // Adjust the font size as needed
    eventEl.style.color = 'white';
    // eventEl.style.background = '#318CE7';
    eventEl.style.width = '100%';
    return { domNodes: [eventEl] };
  }

  customizeEventRender(info: any) {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const taskId = info.event.id;
    const task = tasks.find((t: any) => t.id === taskId);
    
    if (task) {
      let color = '';
      switch (task.frequency) {
        case 'hourly':
          color = '#318CE7'; // Hourly tasks color
          break;
        case 'daily':
          color = '#006A4E'; // Daily tasks color
          break;
        case 'weekly':
          color = '#452c63'; // Weekly tasks color
          break;
        default:
          color = '#318CE7'; // Default color
          break;
      }
      info.el.style.backgroundColor = color; // Set background color
    }
  }
  
  onEventClick(event: any) {
    const taskId = event.event.id; // Assuming you're setting the ID in the event object
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const task = tasks.find((t: any) => t.id === taskId);

    if (task) {
      const dialogRef = this.dialog.open(TaskdetailsdialogcomponentComponent, {
        data: {
          task: {
            ...task,
            extendedProps: {
              ...task.extendedProps,
              // Add the ID to the extendedProps
            }
          }
        },
        panelClass:'task_detail_dialog',
        width:'416px'
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result && result.action === 'edit') {
          this.router.navigate([`/main-view/edit-task/${task.id}`], { state: { task: result.task } });
        }
      });
    } else {
      console.error('Task not found for ID:', taskId);
    }
  }

}













