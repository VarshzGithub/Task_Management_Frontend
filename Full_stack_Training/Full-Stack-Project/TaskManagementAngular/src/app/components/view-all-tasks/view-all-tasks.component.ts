import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-view-all-tasks',
  templateUrl: './view-all-tasks.component.html',
  styleUrls: ['./view-all-tasks.component.css'],
})
export class ViewAllTasksComponent implements OnInit {
  tasks: any[] = []; // Stores all tasks
  loading: boolean = true; // Loader state
  error: string | null = null; // Error messages

  // For Editing Status
  selectedTaskId: number | null = null; // Task ID selected for editing
  updatedStatus: string = ''; // Updated status value
  statusOptions: string[] = ['Pending', 'In-Progress', 'Completed']; // Status options

  selectedCommentTask: any | null = null;
  newComment: string = '';

  constructor(private taskService: TaskService, private router: Router,private authService:AuthService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.fetchTasks();
    } else {
      this.error = 'Session expired. Please log in again.';
      this.loading = false;
    }
  }

  // Fetch all tasks
  fetchTasks(): void {
    this.taskService.getAllTasks().subscribe({
      next: (data) => {
        this.tasks = data.map((task: any) => ({
          ...task,
          assignedTo: task.assignedTo?.name || 'Unassigned', // Handle missing data gracefully
          assignedBy: task.assignedBy?.name || 'Unknown',
          dueDate: task.dueDate || null, // Ensure dueDate is present
          comment: task.comment || '',
        }));
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching tasks:', err);
        this.error =
          err.status === 401
            ? 'Unauthorized access. Please log in again.'
            : 'Failed to fetch tasks. Please try again later.';
        this.loading = false;
      },
    });
  }

  // Start editing task status
  startEditStatus(taskId: number, currentStatus: string): void {
    this.selectedTaskId = taskId;
    this.updatedStatus = currentStatus; // Set current status as the default
  }

  // Save the updated status
  saveStatus(): void {
    if (this.selectedTaskId) {
      // const updatedPayload = this.updatedStatus ; // Only send necessary data
      // console.log(updatedPayload);
      // Fix: Ensure updatedPayload is an object
    const updatedPayload = { status: this.updatedStatus };
    console.log(updatedPayload);

      this.taskService.updateTask(this.selectedTaskId, updatedPayload).subscribe({
        next: () => {
          alert('Status updated successfully!');
          this.fetchTasks(); // Refresh task list
          this.cancelEdit(); // Clear editing state
        },
        error: (err) => {
          console.error('Error updating task:', err);
          alert('Failed to update task status. Please try again.');
        },
      });
    }
  }

  // Delete a task
  deleteTask(taskId: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId).subscribe({
        next: () => {
          this.tasks = this.tasks.filter((task) => task.id !== taskId); // Remove task locally
        },
        error: (err) => {
          console.error('Error deleting task:', err);
          this.error = 'Failed to delete task. Please try again.';
        },
      });
    }
  }

  // viewComment(task: any): void {
  //   this.router.navigate(['/view-comment'], { state: { task } });
  // }
  
  
  viewComment(task: any): void {
    // alert(`Comment for Task ID ${task.id}: ${task.comment || 'No comments available.'}`);
    this.selectedCommentTask = task; // Set the selected task to show the comment
    console.log("task : "+task)
    console.log(this.selectedCommentTask)
  }
  addComment(newComment: string): void {
    if (this.selectedCommentTask && newComment.trim()) {
      // Fetch the current user's email (replace this with your actual method to get the email)
      const emailId = this.authService.getCurrentUser(); // Example method, replace with your actual implementation
  
      // Format the new comment
      const updatedComments = this.selectedCommentTask.comment
        ? `${this.selectedCommentTask.comment}\nUser ${emailId}: ${newComment}`
        : `User ${emailId}: ${newComment}`;
  
      // Call the service to update the comment
      this.taskService.updateTaskComment(this.selectedCommentTask.id, updatedComments, emailId).subscribe({
        next: (response) => {
          console.log('Response from server:', response);
          alert('Comment added successfully!');
          this.selectedCommentTask.comment; // Update the comment locally
          this.newComment = ''; // Clear the input field
        },
        error: (err) => {
          console.error('Error adding comment:', err);
          alert('Failed to add comment. Please try again.');
        },
      });
    }
  }
  



  // Cancel editing
  cancelEdit(): void {
    this.selectedTaskId = null;
    this.updatedStatus = '';
  }
}


