 import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginData = {
    email: '',
    password: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    localStorage.removeItem('token'); // Clear any existing token
  }

  onLogin(): void {
    this.authService.login(this.loginData.email, this.loginData.password).subscribe({
      next: (response: any) => {
        console.log('Login successful:', response);

        const decodedToken = this.parseJwt(response.token);
        console.log('Decoded Token:', decodedToken);

        const userRole = decodedToken?.ROLE?.[0]?.authority || null;

        if (!userRole) {
          alert('User role not found in the token. Please contact support.');
          return;
        }

        // Cache token and role for the logged-in user
        this.authService.cacheToken(this.loginData.email, response.token, userRole);
        localStorage.setItem('userRole', userRole);
        localStorage.setItem('token', response.token);
        alert('Login successful!');
        console.log(userRole);

        // Redirect based on role
        this.redirectBasedOnRole(userRole);
      },
      error: (error) => {
        console.error('Login error:', error);
        const errorMessage =
          error.status === 401
            ? 'Invalid credentials. Please check your email and password.'
            : 'An error occurred during login. Please try again later.';
        alert(errorMessage);
      },
    });
  }

  parseJwt(token: string) {
    try {
      return JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
    } catch (error) {
      console.error('Error parsing token:', error);
      return null;
    }
  }

  redirectBasedOnRole(role: string) {
    switch (role) {
      case 'ROLE_MANAGER':
        console.log('Redirecting to /manager...');
        this.router.navigate(['/manager']);
        break;
      case 'ROLE_ADMIN':
        console.log('Redirecting to /admin...');
        this.router.navigate(['/admin']);
        break;
      case 'ROLE_LEAD':
        console.log('Redirecting to /lead...');
        this.router.navigate(['/lead']);
        break;
      default:
        console.log('Redirecting to /associate...');
        this.router.navigate(['/associate']); // Default route for other roles
        break;
    }
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }
}
