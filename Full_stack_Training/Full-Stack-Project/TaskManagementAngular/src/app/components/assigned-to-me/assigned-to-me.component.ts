import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-assigned-to-me',
  templateUrl: './assigned-to-me.component.html',
  styleUrls: ['./assigned-to-me.component.css'],
})
export class AssignedToMeComponent implements OnInit {
  tasksAssignedToMe: any[] = [];

  constructor(private taskService: TaskService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadTasksAssignedToMe();
  }

  loadTasksAssignedToMe(): void {
    this.taskService.getTasksAssignedToLead().subscribe({
      next: (tasks) => {
        this.tasksAssignedToMe = tasks.map((task) => ({ ...task, newComment: '' }));
      },
      error: (error) => {
        console.error('Error fetching tasks assigned to me:', error);
      },
    });
  }

  addComment(task: any): void {
    const newComment = task.newComment.trim();
    if (!newComment) {
      alert('Comment cannot be empty.');
      return;
    }

    const emailId = this.authService.getCurrentUser(); // Get email of the user
    if (!emailId) {
      alert('Could not determine the logged-in user email.');
      return;
    }

    // API call to update the comment
    this.taskService.updateTaskComment(task.id, newComment, emailId).subscribe({
      next: () => {
        task.comment = task.comment ? `${task.comment}\nUser ${emailId}: ${newComment}` : `User ${emailId}: ${newComment}`;
        task.newComment = ''; // Clear input field after adding comment
      },
      error: (error) => {
        console.error('Error adding comment:', error);
        alert('Failed to add comment.');
      },
    });
  }
}
