import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const email = this.authService.getCurrentUser();
    const token = this.authService.getToken(email);

    if (!token) {
      throw new Error('Unauthorized: Token not found');
    }

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getAllUsers(): Observable<any[]> {
    const baseUrl = this.authService.getBaseUrl();
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${baseUrl}/users`, { headers });
  }

  deleteUser(userId: string): Observable<void> {
    const baseUrl = this.authService.getBaseUrl();
    const headers = this.getHeaders();
    console.log(headers)
    return this.http.delete<void>(`${baseUrl}/users/${userId}`, { headers });
  }

  // getUserById(userId: string): Observable<any> {
  //   const baseUrl = this.authService.getBaseUrl();
  //   const headers = this.getHeaders();
  //   return this.http.get<any>(`${baseUrl}/users/${userId}`, { headers });
  // }
  getUserById(userId: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    const baseUrl = this.authService.getBaseUrl();
    return this.http.get<any>(`${baseUrl}/users/${userId}`, { headers });
  }
  

  // updateUser(userId: string, updatedUser: any): Observable<any> {
  //   const baseUrl = this.authService.getBaseUrl();
  //   const headers = this.getHeaders();
  //   return this.http.put<any>(`${baseUrl}/users/${userId}`, updatedUser, { headers })
  //     .pipe(
  //       tap((response) => console.log('Update Successful:', response)),
  //       catchError((error) => {
  //         console.error('Update Failed:', error);
  //         return throwError(() => error);
  //       })
  //     );
  // }

  updateUser(userId: string, updatedUser: any): Observable<any> {
    const baseUrl = this.authService.getBaseUrl();
    const headers = this.getHeaders();
    return this.http.put<any>(`${baseUrl}/users/${userId}`, updatedUser, { headers })
      .pipe(
        tap((response) => console.log('Update Successful:', response)),
        catchError((error) => {
          console.error('Update Failed:', error);
          return throwError(() => error);
        })
      );
  }
  getToken(): string | null {
    const token = localStorage.getItem('authToken'); // ✅ Ensure token is stored properly
    console.log('Retrieved token:', token); // Debugging
    return token;
  }
  
  
}

