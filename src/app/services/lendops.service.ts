import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LendopsService {

  BACK_END_BASE_URL='https://lendopsback.onrender.com';
  language;
  httpOptions;

  constructor(private http: HttpClient) {
    this.httpOptions = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.language = 'pt-br';
  }

  private get<T>(url: string, params?: any): Observable<T> {
    const headers = this.httpOptions;
    return this.http.get<T>(`${url}`, { headers, params });
  }

  private post<T>(url: string, data: any): Observable<any> {
    return this.http.post<T>(`${url}`, data, { headers:this.httpOptions })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: Error | HttpErrorResponse): Observable<never> {
    return throwError(error.message);
  }

  createUser(userData: any): Observable<any> {
    return this.http.post(`${this.BACK_END_BASE_URL}/users/createUser`, userData );
  }

  loginUser(userData: any): Observable<any> {
    return this.http.post(`${this.BACK_END_BASE_URL}/login`, userData );
  }

  getTotalUsers(): Observable<number> {
    return this.http.get<number>(`${this.BACK_END_BASE_URL}/users/numberOfUsers`);
  }

  getTotalLogins(): Observable<number> {
    return this.http.get<number>(`${this.BACK_END_BASE_URL}/login/accessCount`);
  }
}
