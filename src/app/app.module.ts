import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { MainViewComponent } from './components/main-view/main-view.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import {MatSelectModule} from '@angular/material/select';
import { MY_FORMATS, TaskFormComponent } from './components/task-form/task-form.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonServiceService } from './Services/common-service.service';
import { WeeklyDialogComponent } from './dialogs/weekly-dialog/weekly-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule} from '@angular/common/http';
import { FormGroupDirective } from '@angular/forms';
import { ListAllTasksComponent } from './components/list-all-tasks/list-all-tasks.component';
import {MatCardModule} from '@angular/material/card';
import { FullCalendarModule } from '@fullcalendar/angular';
import { TaskdetailsdialogcomponentComponent } from './dialogs/taskdetailsdialogcomponent/taskdetailsdialogcomponent.component';
import { EditTaskFormComponent } from './components/edit-task-form/edit-task-form.component'; 
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { SearchedTaskDetailsComponent } from './dialogs/searched-task-details/searched-task-details.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { OrdinalDatePipe } from './Pipe/ordinal-date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    TaskFormComponent,
    TaskDetailComponent,
    MainViewComponent,
    WeeklyDialogComponent,
    ListAllTasksComponent,
    TaskdetailsdialogcomponentComponent,
    EditTaskFormComponent,
    SearchedTaskDetailsComponent,
    SignInComponent,
    SignUpComponent,
    OrdinalDatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule,
    MatCheckboxModule,
    MatDialogModule,
    MatRadioModule,
    ReactiveFormsModule,
    AngularEditorModule,
    HttpClientModule,
    MatCardModule,
    FullCalendarModule,
    MatToolbarModule,
    MatAutocompleteModule
  ],
  providers: [
    BreakpointObserver,
    CommonServiceService,
    DatePipe,
    FormGroupDirective,
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
