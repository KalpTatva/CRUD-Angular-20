import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({providedIn:'root'})

export class DashboardService{
  private API_URL = `http://localhost:5267/api`;
  constructor(private http: HttpClient){}

  GetStringData() : Observable<any> {
    var URL = `${this.API_URL}/home`;
    return this.http.get(URL);
  }

  GetAllCourses() : Observable<any> {
    var URL = `${this.API_URL}/Course/GetCourses`;
    return this.http.get(URL)
  }
}