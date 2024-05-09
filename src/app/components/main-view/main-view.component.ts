import { Component } from '@angular/core';
import { CommonServiceService } from 'src/app/Services/common-service.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent {
 constructor(private router: Router, private route: ActivatedRoute, private sidenavService:CommonServiceService) {
  // This piece of code sets up an event listener on the Angular Router to listen for navigation events. It uses the pipe operator to filter out only NavigationEnd events, which represent the end of a navigation event.

  // it logs the current URL using this.router.url.
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // console.log(this.router.url);
      });
  }

  isTasksRouteActive(): boolean {
    return this.router.url.includes('tasks');
  }

  isTaskFormRouteActive(): boolean {
    return this.router.url.includes('task-form');
  }
  isEditTaskFormRouteActive(): boolean {
    return this.router.url.includes('edit-task');
  }


  toggleSidenav() {
    this.sidenavService.toggle()
  }
  
}
