import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  constructor(private router: Router) {}

  ngOnInit() {
    // Logic for loading manager-specific data (if needed)
  }

  navigateToViewAllUsers() {
    this.router.navigate(['/view-all-users']);
  }
  navigateToViewAllTask(){
    this.router.navigate(['/view-all-tasks'])
  }

}
