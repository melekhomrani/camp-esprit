// tag.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tag } from '../models/Tag'; // Adjust path as per your project structure

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private apiUrl = 'http://localhost:8089/api/tags'; // Adjust API URL as per your backend setup

  constructor(private http: HttpClient) {}

  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.apiUrl);
  }
}
