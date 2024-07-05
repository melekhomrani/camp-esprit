import { Component, Input } from '@angular/core';

interface Comment {
  user: string;
  content: string;
}

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent {
  @Input() thread: any;

  newComment: string = '';
  hasLiked: boolean = false; // Flag to track if the user has liked the thread

  postComment(): void {
    if (this.newComment.trim()) {
      const comment: Comment = {
        user: 'Current User',  // Replace with the actual current user
        content: this.newComment
      };
      this.thread.comments.push(comment);
      this.newComment = '';
    }
  }

  likeThread(): void {
    if (!this.hasLiked) { // Check if the user has already liked the thread
      this.thread.likes++;
      this.hasLiked = true; // Set the flag to true after liking
    }
  }
}
