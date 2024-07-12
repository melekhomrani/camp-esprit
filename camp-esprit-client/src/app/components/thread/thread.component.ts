// src/app/components/thread/thread.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { ThreadService } from '../../services/thread/thread.service';
import { ForumThread } from '../../models/Thread';
import { StatisticsService } from '../../services/statistics/statistics.service';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../models/Comment';

@Component({
    selector: 'app-thread',
    templateUrl: './thread.component.html',
    styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {
    @Input() thread!: ForumThread;
    likesCount!: number;
    commentsCount!: number;
    userId!: string;
    liked = false;
    showComments = false;
    comments: Comment[] = [];

    constructor(
        private threadService: ThreadService,
        private statisticsService: StatisticsService,
        private commentService: CommentService
    ) { }

    ngOnInit(): void {
        this.getLikesCount();
        this.getCommentsCount();
        this.loadUserId();
    }

    getLikesCount(): void {
        this.threadService.countLikes(this.thread.id).subscribe(count => {
            this.likesCount = count;
        });
    }

    getCommentsCount(): void {
        this.commentService.countComments(this.thread.id).subscribe(count => {
            this.commentsCount = count;
        });
    }

    loadUserId(): void {
        this.statisticsService.GetInfos().subscribe(data => {
            this.userId = data.id;
        }, error => {
            console.error('Error fetching user info:', error);
        });
    }

    toggleLike(): void {
        if (this.liked) {
            this.unlikeThread();
        } else {
            this.likeThread();
        }
    }

    likeThread(): void {
        if (this.userId) {
            this.threadService.likeThread(this.userId, this.thread.id).subscribe(() => {
                this.liked = true;
                this.getLikesCount();
            }, error => {
                console.error('Error liking thread:', error);
            });
        } else {
            console.error('User ID not loaded.');
        }
    }

    unlikeThread(): void {
        if (this.userId) {
            this.threadService.unlikeThread(this.userId, this.thread.id).subscribe(() => {
                this.liked = false;
                this.getLikesCount();
            }, error => {
                console.error('Error unliking thread:', error);
            });
        } else {
            console.error('User ID not loaded.');
        }
    }

    toggleComments(): void {
        this.showComments = !this.showComments;
        if (this.showComments) {
            this.loadComments();
        }
    }

    loadComments(): void {
        this.commentService.getComments(this.thread.id).subscribe(comments => {
            this.comments = comments;
        }, error => {
            console.error('Error loading comments:', error);
        });
    }
    refreshComments(): void {
        this.getCommentsCount(); // Reload comments count
        this.loadComments();
    }
}
