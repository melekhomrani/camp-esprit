import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Thread} from "../../models/thread";


@Injectable({
  providedIn: 'root'
})
export class ThreadService {
  private threads = new BehaviorSubject<Thread[]>([]);
  currentThreads = this.threads.asObservable();

  constructor() { }

  addThread(thread: Thread) {
    const currentThreads = this.threads.getValue();
    this.threads.next([...currentThreads, thread]);
  }

  likeThread(id: number) {
    const currentThreads = this.threads.getValue();
    const updatedThreads = currentThreads.map(thread => {
      if (thread.id === id) {
        return { ...thread, likes: thread.likes + 1 };
      }
      return thread;
    });
    this.threads.next(updatedThreads);
  }

  addComment(threadId: number, comment: Comment) {
    const currentThreads = this.threads.getValue();
    const updatedThreads = currentThreads.map(thread => {
      if (thread.id === threadId) {
        return { ...thread, comments: [...thread.comments, comment] };
      }
      return thread;
    });
    // this.threads.next(updatedThreads);
  }
}
