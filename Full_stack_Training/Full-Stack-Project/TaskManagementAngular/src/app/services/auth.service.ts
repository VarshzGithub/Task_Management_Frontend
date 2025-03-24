import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080';
  private baseUrl: string = '';
  private currentUserEmail: string = '';
  private tokenCache: { [email: string]: { token: string; role: string } } = {};

  private currentUserSubject = new BehaviorSubject<any>(null);
  // Set the current user after login
  setCurrentUserCom(user: any) {
    this.currentUserSubject.next(user);
  }

  // Get the current user observable
  getCurrentUserCom() {
    return this.currentUserSubject.asObservable();
  }

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      map((response: any) => {
        const token = response.token;
        const role = this.extractRoleFromToken(token);
        this.cacheToken(email, token, role);
        this.setBaseUrl(role);
        this.setCurrentUser(email);
        localStorage.setItem('token', token);
        localStorage.setItem('userRole', role);
        return { token, role };
      })
    );
  }

  private setBaseUrl(role: string) {
    switch (role) {
      case 'ROLE_MANAGER':
        this.baseUrl = `${this.apiUrl}/manager`;
        break;
      case 'ROLE_LEAD':
        this.baseUrl = `${this.apiUrl}/lead`;
        console.log("lead...",this.baseUrl);
        break;
      case 'ROLE_ASSOCIATE':
        this.baseUrl = `${this.apiUrl}/associate`;
        break;
      case 'ROLE_ADMIN':
        this.baseUrl = `${this.apiUrl}/admin`;
        break;
      default:
        this.baseUrl = this.apiUrl;
        break;
    }
  }

  getBaseUrl(): string {
    console.log("urllll ",this.baseUrl);

    return this.baseUrl;
  }

  checkAccessForRoles(allowedRoles: string[]): boolean {
    const userRole = localStorage.getItem('userRole');
    return allowedRoles.includes(userRole || '');
  }

  register(username: string, email: string, password: string, role: string) {
    return this.http.post(`${this.apiUrl}/register`, { username, email, password, role }).pipe(
      map((response: any) => {
        const token = response.token;
        const userRole = role;
        this.cacheToken(email, token, userRole);
        localStorage.setItem('token', token);
        localStorage.setItem('userRole', role);
        return { token, role: userRole };
      })
    );
  }

  cacheToken(email: string, token: string, role: string) {
    this.tokenCache[email] = { token, role };
  }

  getToken(email: string): string | null {
    return this.tokenCache[email]?.token || null;
  }
  getToken1(): string | null {
    const token = localStorage.getItem('authToken'); // ✅ Ensure token is stored properly
    console.log('Retrieved token:', token); // Debugging
    return token;
  }
  

  getRole(email: string): string | null {
    return this.tokenCache[email]?.role || null;
  }

  private extractRoleFromToken(token: string): string {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload?.ROLE?.[0]?.authority || 'Unknown';
    } catch {
      return 'Unknown';
    }
  }

  setCurrentUser(email: string): void {
    this.currentUserEmail = email;
  }

  // getCurrentUser(): string {
  //   return this.currentUserEmail;
  // }


  getCurrentUser(): string {
    if (!this.currentUserEmail) {
      const token = localStorage.getItem('token');
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.currentUserEmail = payload?.email || ''; // Replace 'email' with the actual key in your token
      }
    }
    return this.currentUserEmail;
  }
  
  getUserId(): number {
    const token = localStorage.getItem('token');
    console.log("userid token: "+token)
    if (!token) {
      console.error('No token found. User might not be logged in.');
      return 0;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log(payload);
      return payload?.userId || 0; // Assuming `userId` is included in the JWT payload
    } catch (error) {
      console.error('Failed to extract userId from token:', error);
      return 0;
    }
  }

  getUserRole(): string {
    return localStorage.getItem('userRole') || ''; // Fetch user role directly
  }
  
  // Logout Function
  logout(): void {
    localStorage.removeItem('token'); // Clear token
    localStorage.removeItem('userRole'); // Clear role
    this.currentUserEmail = ''; // Reset current email
    this.tokenCache = {}; // Clear token cache
    this.currentUserSubject.next(null); // Notify observers of logout
    console.log('User logged out successfully');
  }
  
}

