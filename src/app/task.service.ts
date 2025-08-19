import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Task } from './Task.Model';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  // private apiurl = 'http://localhost:3000/auth';



  // private apiUrl = 'http://localhost:3000';

  // constructor(private http: HttpClient) {}

  // signup(data: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/signup`, data);
  // }

  // login(data: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/login`, data);
  // }


private apiUrl = 'https://f-b.onrender.com/auth';
  http: any;

signup(data: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/signup`, data);
}

login(data: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/login`, data);
}






  // constructor(private http: HttpClient) { }

  // getTasks(): Observable<Task[]> {
  //   return this.http.get<Task[]>(this.apiurl).pipe(
  //     catchError((error) => {
  //       console.error('Error fetching tasks:', error);
  //       return throwError(() => new Error('Failed to fetch tasks. Please try again later.'));
  //     })
  //   );
  // }

  // addTask(task: Task): Observable<Task> {
  //   return this.http.post<Task>(this.apiurl, task).pipe(
  //     catchError((error) => {
  //       console.error('Error adding task:', error);
  //       return throwError(() => new Error('Failed to add task.'));
  //     })
  //   );
  // }

  // editTask(id: number, task: Task): Observable<Task> {
  //   return this.http.put<Task>(`${this.apiurl}/${id}`, task).pipe(
  //     catchError((error) => {
  //       console.error('Error editing task:', error);
  //       return throwError(() => new Error('Failed to update task.'));
  //     })
  //   );
  // }

  // deleteTask(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiurl}/${id}`).pipe(
  //     catchError((error) => {
  //       console.error('Error deleting task:', error);
  //       return throwError(() => new Error('Failed to delete task.'));
  //     })
  //   );
  // }
}



