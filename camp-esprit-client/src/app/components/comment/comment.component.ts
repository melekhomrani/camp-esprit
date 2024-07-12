// src/app/comment/comment.component.ts
import {Component, OnInit, Input, SimpleChanges} from '@angular/core';
import {CommentService} from "../../services/comment.service";
import {Comment} from "../../models/Comment";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() threadId!: number;
  comments: Comment[] = [];

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.loadComments();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['threadId'] && !changes['threadId'].firstChange) {
      this.loadComments();
    }
  }

  loadComments(): void {
    this.commentService.getComments(this.threadId).subscribe(
        (data) => {
          this.comments = data;
        },
        (error) => {
          console.error('Error loading comments', error);
        }
    );
  }

}
