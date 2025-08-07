import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthServices {
  private API_URL = `http://localhost:5281/api`;
  constructor(private http: HttpClient) {}

  PostLogin(Data: any): Observable<any> {
    var URL = `${this.API_URL}/Auth/Login`;
    return this.http.post<any>(URL, Data);
  }
}
