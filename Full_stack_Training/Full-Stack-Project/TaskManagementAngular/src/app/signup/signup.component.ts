import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupData = {
    username: '',
    email: '',
    password: '',
    role: '' // Role like 'ADMIN', 'MANAGER', 'LEAD', 'ASSOCIATE'
  };

  roles = ['ADMIN', 'MANAGER', 'LEAD', 'ASSOCIATE']; // Available roles for selection

  constructor(private authService: AuthService, private router: Router) {}

  /*onSignup() {
    // Ensure role is selected
    if (!this.signupData.role) {
      alert('Please select a role.');
      return;
    }

    // Call the AuthService register method
    this.authService.register(
      this.signupData.username,
      this.signupData.email,
      this.signupData.password,
      this.signupData.role
    ).subscribe({
      next: (response) => {
        console.log('Sign-Up successful:', response);
        if (response.token) {
          // Do something with the token, such as saving it for future requests
          console.log('Received token:', response.token);
        }
        //alert('Registration successful! Please log in.');
      },
      error: (error) => {
        console.error('Sign-Up error:', error);
        alert('Error during sign-up. Please check your details and try again.');
      }
    });
  }*/
  // onSignup() {
  //   if (!this.signupData.role) {
  //     alert('Please select a role.');
  //     return;
  //   }
  
  //   this.authService.register(
  //     this.signupData.username,
  //     this.signupData.email,
  //     this.signupData.password,
  //     this.signupData.role
  //   ).subscribe({
  //     next: (response) => {
  //       console.log('Sign-Up successful:', response);
  //       alert('Registration successful! Please log in.');
  //       this.router.navigate(['/login']); // Navigate to login page
  //     },
  //     error: (error) => {
  //       console.error('Sign-Up error:', error);
  //       alert('Error during sign-up. Please check your details and try again.');
  //     }
  //   });
  // }
  onSignup() {
    if (!this.signupData.role) {
      alert('Please select a role.');
      return;
    }

    this.authService.register(
      this.signupData.username,
      this.signupData.email,
      this.signupData.password,
      this.signupData.role
    ).subscribe({
      next: (response) => {
        console.log('Sign-Up successful:', response);
        alert('Registration successful! Please log in.');
        this.router.navigate(['/login']); // Navigate to login
      },
      error: (error) => {
        console.error('Sign-Up error:', error);
        alert('Error during sign-up. Please check your details and try again.');
      }
    });
  }
  
  
}

