import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ManagerGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const userRole = localStorage.getItem('userRole'); // Assume role is stored in localStorage
    console.log('Role in Guard:', userRole);

    // Define allowed roles
    const allowedRoles = ['ROLE_MANAGER', 'ROLE_ADMIN', 'ROLE_LEAD','ROLE_ASSOCIATE'];

    if (userRole && allowedRoles.includes(userRole)) {
      console.log("role in manager guards: ",allowedRoles);
      console.log('Access granted for role:', userRole);
      return true; 
    }

    console.log('Access denied');
    this.router.navigate(['/login']); // Redirect to login if unauthorized
    return false;
  }
}

