import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private baseUrl = 'http://localhost:8089/api';

  constructor(private http: HttpClient) { }

  getChatRooms(): Observable<any> {
    return this.http.get(`${this.baseUrl}/chatrooms`);
  }

  getChatRoom(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/chatrooms/${id}`);
  }

  getMessages(chatRoomId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/messages/chatroom/${chatRoomId}`);
  }

  sendMessage(message: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/messages`, message);
  }
}
