// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class TaskmanagerService {

//   constructor() { }
  
//   user = {
//     id : 123,
//     name:"tanuj",
//     subject:"Maths"

//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskmanagerService {
  private apiUrl = 'https://f-b.onrender.com/auth';

  constructor(private http: HttpClient) {}

  signup(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, data, {withCredentials: true});
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data, {withCredentials: true});
  }
}