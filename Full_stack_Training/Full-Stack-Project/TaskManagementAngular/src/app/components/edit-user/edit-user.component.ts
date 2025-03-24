import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  user: any = null; // Holds the user data
  token: string = ''; // Authentication token
  userForm!:FormGroup
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    public router: Router,
    private fb: FormBuilder
   
  ) {}
  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
    });
    const userId = this.route.snapshot.paramMap.get('id');
    if (!userId) {
      alert('Invalid user ID.');
      this.router.navigate(['/view-all-users']);
      return;
    }
  
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      alert('User is not logged in. Please log in again.');
      this.router.navigate(['/login']);
      return;
    }
  
    const token = this.authService.getToken(currentUser);
    if (token) {
      this.token = token;  // Only assign if the token is not null
    } else {
      alert('Failed to retrieve authentication token. Please log in again.');
      this.router.navigate(['/login']);
      return;
    }
  
    // Fetch user details
    this.userService.getUserById(userId, this.token).subscribe({
      next: (response) => {
        console.log(response)
        this.user = response;
      // Populate the form with the fetched user data
        this.userForm.patchValue({
        name: this.user.name,
        email: this.user.email,
        role: this.user.role,
      });

      },
      error: (error) => {
        console.error('Error fetching user:', error);
        alert('Failed to fetch user details.');
        this.router.navigate(['/view-all-users']);
      },
    });
  }
  
  

  onSubmit(): void {
    if (!this.user) {
      alert('No user data to update.');
      return;
    }
  
    console.log('Submitting user update:', this.user);
  
    // Assuming user.id or user.user_id contains the user's unique identifier
    const userId = this.user.id || this.user.user_id;
    console.log("nmjkbnm"+userId);
  
    if (!userId) {
      alert('User ID is missing.');
      return;
    }
  
    console.log("hii ", userId, this.user);
    this.userService.updateUser(userId, this.user).subscribe({
      next: (response) => {
        console.log(this.user);
        console.log('Update successful:', response); // Debugging API response
        alert('User updated successfully.');
        this.router.navigate(['/view-all-users']); // Redirect after success
      },
      error: (error) => {
        console.log(this.user);
        console.error('Error updating user:', error);
      },
    });
  }
  
  
  // hello(): void {
  //   if (!this.user) {
  //     alert('No user data to update.');
  //     return;
  //   }
  
  //   console.log('Submitting user update:', this.user);
  
    
  //   const userId = this.user.id || this.user.user_id;
  
  //   if (!userId) {
  //     alert('User ID is missing.');
  //     return;
  //   }
  //   if (this.userForm.invalid) {
  //     alert('Please fill in all required fields correctly.');
  //     return;
  //   }
    
  //   const updatedUser = this.userForm.value;
  //   if (!userId) {
  //     alert('User ID is missing.');
  //     return;
  //   }

  //   this.userService.updateUser(userId, updatedUser).subscribe({
  //     next: (response) => {
  //       alert('User updated successfully.');
  //       this.router.navigate(['/view-all-users']);
  //     },
  //     error: (error) => {
  //       console.error('Error updating user:', error);
  //       if (error.status === 401) {
  //         alert('Unauthorized: Please log in again.');
  //         this.router.navigate(['/login']);
  //       } else {
  //         alert('Failed to update user. Please try again.');
  //       }
  //     },
  //   });
  // }
  hello(): void {
    console.log("hello from ")
    if (!this.user) {
      alert('No user data to update.');
      return;
    }
  
    if (this.userForm.invalid) {
      alert('Please fill in all required fields correctly.');
      return;
    }
  
    const userId = this.user.id || this.user.user_id;
    if (!userId) {
      alert('User ID is missing.');
      return;
    }
  
    // Merge form values with the existing user object
    const updatedUser = {
      ...this.user,  // Keep existing user details
      ...this.userForm.value,  // Overwrite with new form values
    };
  
    console.log('Updating user:', updatedUser); // Debugging
  
    this.userService.updateUser(userId, updatedUser).subscribe({
      next: (response) => {
        alert('User updated successfully.');
        this.router.navigate(['/view-all-users']); // Redirect after success
      },
      error: (error) => {
        console.error('Error updating user:', error);
        if (error.status === 401) {
          alert('Unauthorized: Please log in again.');
          this.router.navigate(['/login']);
        } else {
          alert('Failed to update user. Please try again.');
        }
      },
    });
  }
  

  }

