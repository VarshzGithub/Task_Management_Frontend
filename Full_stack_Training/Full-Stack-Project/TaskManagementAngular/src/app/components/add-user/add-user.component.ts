// add-user.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  userData = {
    username: '',
    email: '',
    password: '',
    role: '' // Role like 'ADMIN', 'MANAGER', 'LEAD', 'ASSOCIATE'
  };

  roles = ['ADMIN', 'MANAGER', 'LEAD', 'ASSOCIATE']; // Available roles for selection

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.userData.role) {
      alert('Please select a role.');
      return;
    }

    this.authService.register(
      this.userData.username,
      this.userData.email,
      this.userData.password,
      this.userData.role
    ).subscribe({
      next: (response) => {
        console.log('User added successfully:', response);
        alert('User added successfully!');
        this.router.navigate(['/manager']); // Navigate to manager dashboard
      },
      error: (error) => {
        console.error('Error adding user:', error);
        alert('Error while adding user. Please try again.');
      }
    });
  }
}
