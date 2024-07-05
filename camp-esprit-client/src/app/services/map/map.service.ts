import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {KeycloakService} from "keycloak-angular";
import {Event} from "../../models/Event";

const Event_url = 'http://localhost:8089/api/events'; // Adjust the URL to match your backend
const User_url = 'http://localhost:8089/api/users/user/'
@Injectable({
  providedIn: 'root'
})
export class MapService {
  constructor(private http: HttpClient,private keycloak : KeycloakService) {}

  getEvents(): Observable<any> {
    return this.http.get<any>(Event_url);
  }

  getEventCreator(id:String):Observable<any>{
    return this.http.get<any>(User_url+id);
  }

  createEvent(event : Event): Observable<Event> {
    return this.http.post<Event>(Event_url+"/add", event);
  }
}
