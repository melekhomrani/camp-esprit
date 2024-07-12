import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ForumThread } from '../../models/Thread';

@Injectable({
    providedIn: 'root'
})
export class ThreadService {
    private apiUrl = 'http://localhost:8089/api';
    constructor(private http: HttpClient) { }

    getThreads(): Observable<ForumThread[]> {
        return this.http.get<ForumThread[]>(`${this.apiUrl}/threads`);
    }

    countLikes(threadId: number): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/likes/count/${threadId}`);
    }

    countComments(threadId: number): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/comments/count/${threadId}`);
    }

  likeThread(userId: string, threadId: number): Observable<void> {
    const params = { userId }; // Construct the query parameter object

    return this.http.post<void>(`${this.apiUrl}/likes/like/${threadId}`, null, { params });
  }


    unlikeThread(userId: string, threadId: number): Observable<void> {
        const params = new HttpParams().set('userId', userId); // Construct the query parameter object

        return this.http.delete<void>(`${this.apiUrl}/likes/unlike/${threadId}`, { params });
    }


    hasLiked(userId: string, threadId: number): Observable<boolean> {
        return this.http.get<boolean>(`${this.apiUrl}/likes/hasLiked/${threadId}`, { params: { userId } });
    }

    createThread(title: string, content: string, userId: string, tagIds: number[]): Observable<ForumThread> {
        let params = new HttpParams()
            .set('title', title)
            .set('content', content)
            .set('userId', userId)
            .set('tagIds', tagIds.join(',')); // Convert tagIds array to comma-separated string

        return this.http.post<ForumThread>(`${this.apiUrl}/create/thread`, null, { params });
    }
    getThreadsByUser(userId: string): Observable<ForumThread[]> {
        return this.http.get<ForumThread[]>(`${this.apiUrl}/${userId}`);
    }
    getLikedThreadsByUserId(userId: string): Observable<number[]> {
        const urlApi = `${this.apiUrl}/likes/${userId}`
        console.log (urlApi)
        return this.http.get<number[]>(urlApi);
    }

    getRecommendations(requestData: any): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>('http://localhost:8000/recommendations', requestData, { headers });
    }

}
