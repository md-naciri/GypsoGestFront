import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../pages/authentication/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    return this.authService.isRoleValid().pipe(
      map(isValid => {
        if (!isValid) {
          return this.router.parseUrl('/dashboard'); // Redirect to signin if role is not valid
        }
        return true;
      }),
      catchError(() => {
        return of(this.router.parseUrl('/auth/signin'));// Handle observable error by redirecting to signin
      })
    );
  }
}