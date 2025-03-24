import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-manager-tasks',
  templateUrl: './manager-tasks.component.html',
  styleUrls: ['./manager-tasks.component.css'],
})
export class ManagerTasksComponent implements OnInit {
  managerAssignedTasks: any[] = [];
  statusOptions: string[] = ['Pending', 'In-Progress', 'Completed']; // Status choices
  selectedTaskId: number | null = null;
  updatedStatus: string = '';

  constructor(private taskService: TaskService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadManagerAssignedTasks();
  }

  // Start Editing Task Status
  startEditStatus(taskId: number, currentStatus: string): void {
    this.selectedTaskId = taskId;
    this.updatedStatus = currentStatus;
  }

  // Save Updated Status
  saveStatus(): void {
    if (this.selectedTaskId) {
      this.taskService.updateTask(this.selectedTaskId, { status: this.updatedStatus }).subscribe({
        next: () => {
          alert('Status updated successfully!');
          this.loadManagerAssignedTasks(); // Refresh task list
          this.cancelEdit(); // Clear edit mode
        },
        error: (err) => {
          console.error('Error updating task:', err);
          alert('Failed to update task status. Please try again.');
        },
      });
    }
  }

  // Delete Task
  deleteTask(taskId: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId).subscribe({
        next: () => {
          this.managerAssignedTasks = this.managerAssignedTasks.filter((task) => task.id !== taskId);
          alert('Task deleted successfully!');
        },
        error: (err) => {
          console.error('Error deleting task:', err);
          alert('Failed to delete task.');
        },
      });
    }
  }

  // Cancel Editing
  cancelEdit(): void {
    this.selectedTaskId = null;
    this.updatedStatus = '';
  }
  
  loadManagerAssignedTasks(): void {
    this.taskService.getTasksAssignedByManager().subscribe({
      next: (tasks) => {
        this.managerAssignedTasks = tasks.map((task) => ({ ...task, newComment: '' }));
      },
      error: (error) => {
        console.error('Error fetching tasks assigned by manager:', error);
      },
    });
  }

  addComment(task: any): void {
    const newComment = task.newComment.trim();
    if (!newComment) {
      alert('Comment cannot be empty.');
      return;
    }

    const emailId = this.authService.getCurrentUser(); // Retrieve the logged-in user's email
    if (!emailId) {
      alert('Could not determine the logged-in user email.');
      return;
    }

   // this.taskService.updateTaskComment(task.id, { comment: newComment, emailId }).subscribe({
    this.taskService.updateTaskComment(task.id, newComment, emailId).subscribe({
      next: () => {
        task.comment = task.comment ? `${task.comment}\nUser ${emailId}: ${newComment}` : `User ${emailId}: ${newComment}`;
        task.newComment = ''; // Clear the input field after adding the comment
      },
      error: (error) => {
        console.error('Error adding comment:', error);
        alert('Failed to add comment.');
      },
    });
  }
}

