
// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-task-form',
//   templateUrl: './task-form.component.html',
//   styleUrls: ['./task-form.component.scss']
// })
// export class TaskFormComponent {
//   selectedValue!: string;
//   selectedCar!: string;
//   panelOpenState = false;
//   task = {
//     repeat: false,
//     frequency: '',
//     dailyFrequency: [],
//     weeklyFrequency: [],
//     endDate: 'never',
//     occurrences: 0,
//     endDateSpecific: ''
//   };
  
//   weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// myFormControl: any;
// }

import { Component } from '@angular/core';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  panelOpenState = false;
  task = {
    repeat: false,
    frequency: '',
    dailyFrequency: [],
    weeklyFrequency: [],
    endDate: 'never',
    occurrences: 0,
    endDateSpecific: ''
  };
  weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  myFormControl: any;
}
