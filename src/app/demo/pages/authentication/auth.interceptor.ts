import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PersistanceService } from './persistance.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private persistanceService:PersistanceService,private router:Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.url.endsWith('/signin') || request.url.endsWith('/validate-token') ){
      return next.handle(request);
    }
    const token = this.persistanceService.get('accessToken');

    if (token) {
      console.log('Access token found');
      const newCloneRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(newCloneRequest).pipe(
        tap(
          (event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              console.log('HTTP Response:', event);
            }
          },
          (error) => {
            console.error('HTTP Error:', error);
          }
        ),
        // catchError((error: HttpErrorResponse) => {
        //   return throwError(error);
        // })
        catchError((error: HttpErrorResponse) => {
          if (error.status === 403) {
            this.router.navigate(['/dashboard']);
          }
          return throwError(error);
        })
      );
    } else {
      console.error('Access token not found');
      this.router.navigate(['/auth/signin']);
      return next.handle(request);
    }
  }
}