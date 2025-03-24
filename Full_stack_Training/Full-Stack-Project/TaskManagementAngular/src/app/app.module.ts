import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManagerComponent } from './manager/manager.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ViewAllUsersComponent } from './components/view-all-users/view-all-users.component';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './services/auth.interceptor';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { ViewAllTasksComponent } from './components/view-all-tasks/view-all-tasks.component';
import { LeadComponent } from './lead/lead.component';
import { AssignedToMeComponent } from './components/assigned-to-me/assigned-to-me.component';
import { AssignedByMeComponent } from './components/assigned-by-me/assigned-by-me.component';
import { ViewCommentComponent } from './view-comment/view-comment.component';
import { AssociateComponent } from './associate/associate.component';
import { ManagerTasksComponent } from './components/manager-tasks/manager-tasks.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminComponent } from './admin/admin.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ManagerComponent,
    AddUserComponent,
    ViewAllUsersComponent,
    EditUserComponent,
    AddTaskComponent,
    ViewAllTasksComponent,
    LeadComponent,
    AssignedToMeComponent,
    AssignedByMeComponent,
    ViewCommentComponent,
    AssociateComponent,
    ManagerTasksComponent,
    NavbarComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true // Allow multiple interceptors in the chain
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
