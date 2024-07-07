import { Component, OnInit } from '@angular/core';
import { ThreadService } from "../../services/thread/thread.service";
import { ForumThread } from "../../models/Thread";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  threads: ForumThread[] = [];

  constructor(private threadService: ThreadService) { }

  ngOnInit(): void {
    this.threadService.getThreads().subscribe((data) => {
      this.threads = data;
      console.log(this.threads);  // Add this line to check the data
    });
  }
}
