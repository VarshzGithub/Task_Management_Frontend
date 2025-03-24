import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  createTask(task: any): Observable<any> {
    const baseUrl = this.authService.getBaseUrl();
    const headers = this.getHeaders();
    return this.http.post(`${baseUrl}/tasks`, task, { headers });
  }

  // getTasksAssignedToLead(leadId: number): Observable<any[]> {
  //   const baseUrl = this.authService.getBaseUrl();
  //   const headers = this.getHeaders();
  //   return this.http.get<any[]>(`${baseUrl}/tasks/assignedTo`, { headers });
  // }

  // getTasksAssignedByLead(leadId: number): Observable<any[]> {
  //   const baseUrl = this.authService.getBaseUrl();
  //   const headers = this.getHeaders();
  //   return this.http.get<any[]>(`${baseUrl}/tasks/assignedBy`, { headers });
  // }

  getTasksAssignedToLead(): Observable<any[]> {
    const baseUrl = this.authService.getBaseUrl();
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${baseUrl}/tasks/assignedTo`, { headers });
  }

  getTasksAssignedByLead(): Observable<any[]> {
    const baseUrl = this.authService.getBaseUrl();
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${baseUrl}/tasks/assignedBy`, { headers });
  }
  
  getTasksAssignedByManager(): Observable<any[]> {
    const baseUrl = this.authService.getBaseUrl();
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${baseUrl}/tasks/assignedByManager`,{ headers });
  }
  


  getAllTasks(): Observable<any[]> {
    const baseUrl = this.authService.getBaseUrl();
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${baseUrl}/tasks`, { headers });
  }

  // updateTask(taskId: number, payload: string ): Observable<any> {
  //   const baseUrl = this.authService.getBaseUrl();
  //   const headers = this.getHeaders();
  //   console.log("update task: ",headers)
  //   return this.http.put(`${baseUrl}/tasks/${taskId}`, payload, { headers });
  // }
  updateTask(taskId: number, payload: { status: string }): Observable<any> {
    const baseUrl = this.authService.getBaseUrl();
    const headers = this.getHeaders();
    console.log("update task: ", headers);
    return this.http.put(`${baseUrl}/tasks/${taskId}`, payload, { headers });
  }
  

  // updateTaskComment(taskId: number, comment: string): Observable<any> {
  //   const baseUrl = this.authService.getBaseUrl();
  //   return this.http.patch(`${baseUrl}/tasks/${taskId}/comment`, { comment }, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  // }
  

  // updateTaskComment(taskId: number, comment: string, userId: number): Observable<any> {
  //   const baseUrl = this.authService.getBaseUrl();
  //   const headers = this.getHeaders();
    
  //   const payload = {
  //     comment,
  //     userId,
  //   };
  
  //   return this.http.patch(`${baseUrl}/tasks/${taskId}/comment`, payload, { headers });
  // }

  updateTaskComment(taskId: number, comment: string, emailId: string): Observable<any> {
    const baseUrl = this.authService.getBaseUrl();
    const headers = this.getHeaders();
  
    const payload = {
      comment: comment,
      emailId: emailId,
    };
  console.log("task service "+payload)
    // Change responseType to 'text' to handle plain text response
    return this.http.patch(`${baseUrl}/tasks/${taskId}/comment`, payload, { 
      headers,
      responseType: 'text' // This will prevent Angular from trying to parse it as JSON
    });
  }
  
  
   // Update task comment
  //  updateTaskComment(taskId: number, comment: string): Observable<any> {
  //   const baseUrl = this.authService.getBaseUrl();
  //   const headers = this.getHeaders();
    
  //   // Wrap comment into an object if necessary
  //   const commentPayload = { comment };

  //   return this.http.patch(`${baseUrl}/tasks/${taskId}/comment`, commentPayload, { headers });
  // }
  

  deleteTask(taskId: number): Observable<void> {
    const baseUrl = this.authService.getBaseUrl();
    const headers = this.getHeaders();
    return this.http.delete<void>(`${baseUrl}/tasks/${taskId}`, { headers });
  }
}
