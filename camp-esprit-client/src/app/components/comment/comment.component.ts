// src/app/components/comment/comment.component.ts
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() commentUsername!: string;
  @Input() commentContent!: string;

  constructor() { }

  ngOnInit(): void { }
}
