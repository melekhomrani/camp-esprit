// src/app/services/comment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:8089/api/comments';

  constructor(private http: HttpClient) { }

  getComments(threadId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/thread/${threadId}`);
  }

  countComments(threadId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count/${threadId}`);
  }

  addComment(threadId: number, userId: string, content: string): Observable<Comment> {
    const url = `${this.apiUrl}/add/${threadId}/${userId}`;
    return this.http.post<Comment>(url, content, {
      headers: { 'Content-Type': 'text/plain' }  // Set Content-Type as text/plain
    });
  }

  deleteComment(commentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${commentId}`);
  }
}
