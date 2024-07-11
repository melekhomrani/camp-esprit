// src/app/components/feed/feed.component.ts
import { Component, OnInit } from '@angular/core';
import { ThreadService } from '../../services/thread/thread.service';
import { ForumThread } from '../../models/Thread';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  threads: ForumThread[] = [];

  constructor(private threadService: ThreadService) { }

  ngOnInit(): void {
    this.loadThreads();
  }

  loadThreads(): void {
    this.threadService.getThreads().subscribe(threads => {
      this.threads = threads;
    }, error => {
      console.error('Error loading threads:', error);
    });
  }
}
