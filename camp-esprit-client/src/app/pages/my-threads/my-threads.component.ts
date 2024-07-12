import { Component, OnInit } from '@angular/core';
import { ForumThread } from '../../models/Thread';
import { ThreadService } from '../../services/thread/thread.service';
import { StatisticsService } from '../../services/statistics/statistics.service';

@Component({
  selector: 'app-my-threads',
  templateUrl: './my-threads.component.html',
  styleUrls: ['./my-threads.component.css']
})
export class MyThreadsComponent implements OnInit {
  threads: ForumThread[] = [];
  showPostThread: boolean = false;
  userId: string | undefined;

  constructor(
      private threadService: ThreadService,
      private statisticsService: StatisticsService
  ) { }

  ngOnInit(): void {
    this.loadUserIdAndThreads();
  }

  loadUserIdAndThreads(): void {
    this.statisticsService.GetInfos().subscribe(
        data => {
          this.userId = data.id;
          if (this.userId) {
            this.loadThreads(); // Load threads after fetching userId
          }
        },
        error => {
          console.error('Error fetching user info:', error);
        }
    );
  }

  loadThreads(): void {
    if (this.userId) {
      this.threadService.getThreadsByUser(this.userId).subscribe(
          threads => {
            this.threads = threads;
          },
          error => {
            console.error('Error loading threads:', error);
          }
      );
    }
  }

  togglePostThreadVisibility(): void {
    this.showPostThread = !this.showPostThread;
  }

  onThreadAdded(): void {
    // Refresh the list of threads after a new thread is added
    if (this.userId) {
      this.loadThreads(); // Reload threads after a new thread is added
    }
  }
}
