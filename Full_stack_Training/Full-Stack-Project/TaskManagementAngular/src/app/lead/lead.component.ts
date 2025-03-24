import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-lead-dashboard',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.css'],
})
export class LeadComponent implements OnInit {
  tasksAssignedToMe: any[] = [];
  tasksAssignedByMe: any[] = [];
  currentUserEmail: string = '';
  leadId: number = 0;

  // State variables for toggling
  showTasksAssignedToMe: boolean = true;
  showTasksAssignedByMe: boolean = false;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('Lead Dashboard initialized');
    
  }

  navigateToAssignedToMe() {
    this.router.navigate(['/assigned-to-me']);
  }

  navigateToAssignedByMe() {
    this.router.navigate(['/assigned-by-me']);
  }

  navigateToViewAllUsers() {
    this.router.navigate(['/view-all-users']);
  }

  navigateToAddTask() {
    this.router.navigate(['/add-task']);
  }
}


