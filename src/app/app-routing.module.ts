import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaskFormComponent } from './components/task-form/task-form.component';
import { MainViewComponent } from './components/main-view/main-view.component';
import { ListAllTasksComponent } from './components/list-all-tasks/list-all-tasks.component';
import { EditTaskFormComponent } from './components/edit-task-form/edit-task-form.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
const routes: Routes = [
  { path: '', redirectTo: 'main-view/tasks', pathMatch: 'full' },
  {
    path: 'main-view',
    component: MainViewComponent,
    children: [
      { path:'tasks', component: ListAllTasksComponent },
      { path: 'task-form', component:  TaskFormComponent },
      { path: 'edit-task/:id', component: EditTaskFormComponent }
    ]
  },
  {
    path:'sign-in', component: SignInComponent
  },
  {
    path:'sign-up', component: SignUpComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
