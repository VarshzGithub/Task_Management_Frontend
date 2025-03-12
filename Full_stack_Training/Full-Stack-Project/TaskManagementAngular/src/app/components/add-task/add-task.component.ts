import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  task = {
    description: '',
    status: 'Pending',
    assignedTo: {
      user_id: null,
    },
    assignedBy: {
      user_id: null,
    },
    comment: '',
    dueDate: '',
  };

  currentUserRole: string = '';

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Fetch the current user's role
    this.currentUserRole = this.authService.getRole(this.authService.getCurrentUser()) || '';
    console.log('Current User Role:', this.currentUserRole);
  }

  onSubmit(): void {
    console.log("Task Before Submission:", this.task);

    this.taskService.createTask(this.task).subscribe({
      next: (response) => {
        console.log('Task created successfully:', response);
        alert('Task created successfully!');

        // Navigate based on the user's role
        if (this.currentUserRole === 'ROLE_MANAGER') {
          this.router.navigate(['/manager']);
        } else if (this.currentUserRole === 'ROLE_LEAD') {
          this.router.navigate(['/lead']); // Update the route for Lead
        } else {
          this.router.navigate(['/']); // Default route
        }
      },
      error: (error) => {
        console.error('Error creating task:', error);
        alert('Failed to create task.');
      },
    });
  }
}

