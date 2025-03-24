import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-view-all-users',
  templateUrl: './view-all-users.component.html',
  styleUrls: ['./view-all-users.component.css'],
})
export class ViewAllUsersComponent implements OnInit {
  users: any[] = []; // To store all users
  errorMessage: string = ''; // To handle error messages

  constructor(private userService: UserService,private authService:AuthService,private router:Router) {}

  // ngOnInit(): void {
  //   const email = this.authService.getCurrentUser();
  //   this.fetchAllUsers(email); // Fetch users when the component loads
  // }

  // /**
  //  * Fetch all users and populate the 'users' array
  //  */
  // fetchAllUsers(email:string): void {
  //   this.userService.getAllUsers(email).subscribe({
  //     next: (response) => {
  //       console.log('Fetched users:', response);
  //       this.users = response; // Assign fetched users to the array
  //     },
  //     error: (error) => {
  //       console.error('Error fetching users:', error);
  //       this.errorMessage = 'Failed to fetch users. Please try again later.';
  //     },
  //   });
  // }
  ngOnInit(): void {
    const email = this.authService.getCurrentUser();
    if (email) {
      this.fetchAllUsers(email);
    } else {
      this.errorMessage = 'User is not logged in. Please log in again.';
    }
  }
  
  fetchAllUsers(email: string): void {
    this.userService.getAllUsers().subscribe({
      next: (response) => {
        console.log('Fetched Users:', response);
        this.users = response;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
        if (error.message === 'Unauthorized: Token not found in cache') {
          this.errorMessage = 'Session expired. Please log in again.';
        } else {
          this.errorMessage = 'Failed to fetch users. Please try again later.';
        }
      },
    });
  }
  
  editUser(userId: string): void {
    this.router.navigate([`/edit-user/${userId}`]);
  }
  

  // Delete User
  onDelete(user: any): void {
    if (confirm(`Are you sure you want to delete user ${user.name}?`)) {
      this.userService.deleteUser(user.user_id).subscribe({
        next: () => {
          alert(`User ${user.name} deleted successfully.`);
          this.users = this.users.filter((u) => u.user_id !== user.user_id);
        },
        error: (error) => {
          console.error('Error deleting user:', error);
          alert('Failed to delete user. Please try again later.');
        },
      });
    }
  }
}

