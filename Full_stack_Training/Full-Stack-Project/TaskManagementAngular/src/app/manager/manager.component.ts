import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent {
  constructor(private router: Router, private authService:AuthService) {}

  ngOnInit() {
    // Logic for loading manager-specific data (if needed)
  }

  navigateToAddUser() {
    this.router.navigate(['/add-user']);
  }
  navigateToViewAllUsers() {
    this.router.navigate(['/view-all-users']);
  }
  navigateToAddTask() {
    this.router.navigate(['/add-task']);
  }
  navigateToViewAllTask(){
    this.router.navigate(['/manager-tasks'])
  }

  // Navigate to the dashboard home page
  navigateToDashboard(): void {
    this.router.navigate(['/manager']);
  }

  // Logout function
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  
  
}

