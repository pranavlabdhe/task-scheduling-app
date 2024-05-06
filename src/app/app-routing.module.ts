import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainViewComponent } from './components/main-view/main-view.component';
import { TaskFormComponent } from './components/task-form/task-form.component';


const routes: Routes = [
  {
    path:'', component:MainViewComponent
  },

  {
    path: 'main-view',
    component: MainViewComponent,
    children: [
      { path: 'task-form', component:  TaskFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// Hourly -> should date-range
// Daily -> should basic date-range
// Weekly -> should display the days of week
