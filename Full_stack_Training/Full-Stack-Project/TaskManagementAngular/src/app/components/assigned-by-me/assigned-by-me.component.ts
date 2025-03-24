import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-assigned-by-me',
  templateUrl: './assigned-by-me.component.html',
  styleUrls: ['./assigned-by-me.component.css'],
})
export class AssignedByMeComponent implements OnInit {
  tasksAssignedByMe: any[] = [];

  constructor(private taskService: TaskService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadTasksAssignedByMe();
  }

  loadTasksAssignedByMe(): void {
    this.taskService.getTasksAssignedByLead().subscribe({
      next: (tasks) => {
        this.tasksAssignedByMe = tasks.map((task) => ({ ...task, newComment: '' }));
      },
      error: (error) => {
        console.error('Error fetching tasks assigned by me:', error);
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

