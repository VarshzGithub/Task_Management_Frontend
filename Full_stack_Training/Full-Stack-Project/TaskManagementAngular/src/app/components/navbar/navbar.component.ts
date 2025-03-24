import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private router: Router, private authService: AuthService) {}

  // navigateToHome() {
  //   this.router.navigate(['/home']);  // Home page route
  // }
  navigateToHome() {
    const userRole = this.authService.getUserRole();
    console.log("roleeee : "+userRole) // Get the user's role

    switch (userRole) {
      case 'ROLE_MANAGER':
        this.router.navigate(['/manager']);
        break;
      case 'ROLE_LEAD':
        this.router.navigate(['/lead']);
        break;
      case 'ROLE_ASSOCIATE':
        this.router.navigate(['/associate']);
        break;
      default:
        this.router.navigate(['/login']); // Fallback route
        break;
    }
  }

  logout() {
    this.authService.logout();  // Handle logout logic
    this.router.navigate(['/login']);  // Redirect to login page
  }
}

