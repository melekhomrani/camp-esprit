import { Component, OnInit } from '@angular/core';
import { Tag } from "../../models/Tag";
import { ThreadService} from "../../services/thread/thread.service";
import { TagService } from "../../services/tag.service";
import {StatisticsService} from "../../services/statistics/statistics.service";

@Component({
    selector: 'app-post-thread',
    templateUrl: './post-thread.component.html',
    styleUrls: ['./post-thread.component.css']
})
export class PostThreadComponent implements OnInit {

    tags: Tag[] = [];
    title: string = '';
    content: string = '';
    userId: string = ''; // Assuming userId is obtained from authentication or another source

    constructor(private tagService: TagService, private threadService: ThreadService, private statisticsService: StatisticsService) { }

    ngOnInit(): void {
        this.loadTags();
        this.loadUserId();
    }

    loadTags(): void {
        this.tagService.getAllTags().subscribe(
            tags => {
                this.tags = tags.map(tag => ({ ...tag, selected: false })); // Initialize selected property locally
            },
            error => {
                console.error('Error loading tags:', error);
            }
        );
    }

    postThread(): void {
        const selectedTags = this.tags.filter(tag => tag.selected);
        const tagIds = selectedTags.map(tag => tag.id);

        this.threadService.createThread(this.title, this.content, this.userId, tagIds)
            .subscribe(
                response => {
                    console.log('Thread created successfully:', response);
                    // Optionally reset form fields or perform other actions upon success
                    this.title = '';
                    this.content = '';
                    this.tags.forEach(tag => tag.selected = false);
                },
                error => {
                    console.error('Error creating thread:', error);
                    // Handle error cases, display error messages, etc.
                }
            );
    }
    loadUserId(): void {
        this.statisticsService.GetInfos().subscribe(data => {
            this.userId = data.id;
        }, error => {
            console.error('Error fetching user info:', error);
        });
    }

    toggleTagSelection(tag: Tag): void {
        tag.selected = !tag.selected; // Toggle selected state locally
    }
}
