import { Injectable, inject } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private router = inject(Router);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUrl = this.router.url;

    const isAdminRoute = currentUrl.startsWith('/admin');
    const isUserRoute = !isAdminRoute;

    // Pick the right token
    const token = isAdminRoute
      ? localStorage.getItem('myToken')
      : localStorage.getItem('userToken');

    // Clone request if token is available
    const authReq = token
      ? req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`)
        })
      : req;

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          if (isAdminRoute) {
            console.warn('Unauthorized admin - redirecting to /admin/login');
            localStorage.removeItem('myToken');
            this.router.navigate(['/admin/login']);
          } else if (isUserRoute) {
            console.warn('Unauthorized user - redirecting to /login');
            localStorage.removeItem('userToken');
            this.router.navigate(['/login']);
          }
        }

        return throwError(() => error);
      })
    );
  }
}
