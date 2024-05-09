// searched-task-details.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-searched-task-details',
  templateUrl: './searched-task-details.component.html',
  styleUrls: ['./searched-task-details.component.scss']
})
export class SearchedTaskDetailsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
