import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  // Base url
  private readonly baseurl: string = 'http://localhost:8090/api';

  constructor(private http: HttpClient) { }

  // GET
  GetInfos(): Observable<any> {
    return this.http
      .get(`${this.baseurl}/users/infos`)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // url: events/countByRealmId
  // url: events/countByUserId
  // url: events/countByIpAddress
  // url: events/countByType
  // url: creds/countByType

  // GET
  CountEventsByRealmId(): Observable<any> {
    return this.http
      .get(`${this.baseurl}/events/countByRealmId`)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // GET
  CountEventsByUserId(): Observable<any> {
    return this.http
      .get(`${this.baseurl}/events/countByUserId`)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // GET
  CountEventsByIpAddress(): Observable<any> {
    return this.http
      .get(`${this.baseurl}/events/countByIpAddress`)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // GET
  CountEventsByType(): Observable<any> {
    return this.http
      .get(`${this.baseurl}/events/countByType`)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // GET
  CountCredsByType(): Observable<any> {
    return this.http
      .get(`${this.baseurl}/creds/countByType`)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // Error handling
  errorHandl(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
