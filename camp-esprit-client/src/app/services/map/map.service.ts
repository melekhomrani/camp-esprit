import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../../models/Event';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private apiUrl = 'http://localhost:8089/api/events';

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl);
  }

  getEventById(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${id}`);
  }

  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(`${this.apiUrl}/add`, event);
  }

  updateEvent(id: number, event: Event): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/${id}`, event);
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  filterEvents(description: string, eventDate: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/filter`, {
      params: {
        description: description,
        eventDate: eventDate
      }
    });
  }

  getEventCreator(userId: string): Observable<any> {
    return this.http.get<any>(`http://localhost:8089/api/users/user/aziz.rahali`);
  }
}
