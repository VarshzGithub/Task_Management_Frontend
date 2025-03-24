import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-view-comment',
  templateUrl: './view-comment.component.html',
  styleUrls: ['./view-comment.component.css']
})
export class ViewCommentComponent {
 // task: any;

  @Input() task: any; // Input to receive the task details from the parent
  comments: any[] = []; // Array to hold comments
  newComment: string = ''; // For the new comment input

  constructor(private router: Router,private taskService: TaskService, private authService: AuthService) {
    this.task = this.router.getCurrentNavigation()?.extras.state?.['task'] || {};
  }

  ngOnInit(): void {
    this.loadComments();
  }

  // Load comments for the task
  loadComments(): void {
    if (this.task && this.task.id) {
      // Assuming comments are stored in the task's `comment` field as a string
      const rawComments = this.task.comment || '';
      this.comments = rawComments
        .split('\n')
        .map((line: string) => {
          const [emailId, ...textParts] = line.split(': ');
          return { emailId, text: textParts.join(': ') };
        });
    }
  }

  // Add a new comment
  addComment(): void {
    if (this.newComment.trim()) {
      const emailId = this.authService.getCurrentUser(); // Get the logged-in user's email
      const newComment = `User ${emailId}: ${this.newComment.trim()}`;
      const updatedComments = this.comments.map(c => `${c.emailId}: ${c.text}`).join('\n') + '\n' + newComment;

      // Call the service to update comments in the backend
      this.taskService.updateTaskComment(this.task.id, updatedComments, emailId).subscribe({
        next: () => {
          alert('Comment added successfully!');
          this.comments.push({ emailId, text: this.newComment.trim() }); // Update the local comments
          this.newComment = ''; // Clear the input field
        },
        error: (err) => {
          console.error('Error adding comment:', err);
          alert('Failed to add comment. Please try again.');
        }
      });
    }
  }
}
