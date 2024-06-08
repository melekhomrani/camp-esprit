import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  private readonly backendUrl = 'http://localhost:8089';
  constructor(private http: HttpClient) {}

  getFromBackend(): Observable<Array<any>> {
    return this.http.get<any>(`${this.backendUrl}/api/test/user`);
  }
}
