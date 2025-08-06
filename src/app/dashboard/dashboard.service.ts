import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private API_URL = `http://localhost:5281/api`;
  constructor(private http: HttpClient) {}

  GetStringData(): Observable<any> {
    var URL = `${this.API_URL}/home`;
    return this.http.get(URL);
  }

  GetAllCourses(): Observable<any> {
    var URL = `${this.API_URL}/Course/GetCourses`;
    return this.http.get(URL);
  }

  GetCourseById(id: number): Observable<any> {
    var URL = `${this.API_URL}/Course/GetCourseById?id=${id}`;
    return this.http.get<any>(URL);
  }

  postCourses(data: any): Observable<any> {
    const apiUrl = `${this.API_URL}/Course/AddCourse`;
    return this.http.post<any>(apiUrl, data);
  }

  EditCourse(data: any): Observable<any> {
    const apiUrl = `${this.API_URL}/Course/EditCourse`;
    return this.http.put<any>(apiUrl, data);
  }

  DeleteCourse(id: number): Observable<any> {
    const apiUrl = `${this.API_URL}/Course/DeleteCourse?id=${id}`;
    return this.http.delete<any>(apiUrl);
  }
}
