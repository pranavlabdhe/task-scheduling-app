import { Component } from '@angular/core';
import { CommonServiceService } from 'src/app/Services/common-service.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent {
  constructor(private sidenavService: CommonServiceService) {}

  toggleSidenav() {
    this.sidenavService.toggle()
  }
  
}
