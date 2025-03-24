import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ManagerComponent } from './manager/manager.component';
import { ManagerGuard } from './guards/manager.guard';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ViewAllUsersComponent } from './components/view-all-users/view-all-users.component';
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

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'manager', component: ManagerComponent, canActivate: [ManagerGuard] },
  {path:'lead',component:LeadComponent,canActivate:[ManagerGuard]},
  {path:'associate',component:AssociateComponent,canActivate:[ManagerGuard]},
  { path: 'add-task', component: AddTaskComponent },
  { path: 'add-user', component: AddUserComponent, canActivate: [ManagerGuard] },
  {path:'view-all-users',component:ViewAllUsersComponent,canActivate:[ManagerGuard]},
  {path:'view-all-tasks',component:ViewAllTasksComponent,canActivate:[ManagerGuard]},
  {path:'manager-tasks',component:ManagerTasksComponent},
  { path: 'edit-user/:id', component: EditUserComponent },
  { path: 'assigned-to-me', component: AssignedToMeComponent },
  { path: 'assigned-by-me', component: AssignedByMeComponent },
  { path: '**', redirectTo: '/login' }, // Fallback route
  { path: '', redirectTo: '/manager', pathMatch: 'full' },
  { path: 'view-comment', component: ViewCommentComponent },
  {path:'navbar',component:NavbarComponent},
  {path:'admin',component:AdminComponent,canActivate:[ManagerGuard]}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
