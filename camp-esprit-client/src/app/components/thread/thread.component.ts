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
    this.thread.likes++;
  }
}
