import { Component, OnInit } from '@angular/core';
import {ThreadService} from "../../services/thread/thread.service";
import {Thread} from "../../models/thread";
import {Comment} from "../../models/Comment";


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  threads: Thread[] = []

  constructor() {}

  ngOnInit(): void {}

  addThread(thread: Thread): void {
    this.threads.unshift(thread);
  }
}




