// src/app/components/add-comment/add-comment.component.ts
import { Component, Input } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../models/Comment';

@Component({
    selector: 'app-add-comment',
    templateUrl: './add-comment.component.html',
    styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent {
    @Input() threadId!: number;
    @Input() userId!: string;
    content: string = '';
    showAddComment: boolean = false;

    constructor(private commentService: CommentService) { }

    toggleAddComment(): void {
        this.showAddComment = !this.showAddComment;
    }

    submitComment(): void {
        if (this.content.trim()) {
            this.commentService.addComment(this.threadId, this.userId, this.content).subscribe(
                (newComment: Comment) => {
                    console.log('Comment added:', newComment);
                    this.content = ''; // Clear the textarea
                    this.showAddComment = false; // Hide the form
                },
                (error) => {
                    console.error('Error adding comment:', error);
                }
            );
        }
    }
}
