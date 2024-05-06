import { Component, ViewChild, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { CommonServiceService } from 'src/app/Services/common-service.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isHandset$: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  private isOpenSubscription!: Subscription;

  constructor(private breakpointObserver: BreakpointObserver, private sidenavService: CommonServiceService) {}

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
    this.sidenav.close()
  }
  ngOnDestroy() {
    this.isOpenSubscription.unsubscribe();
  }
}
