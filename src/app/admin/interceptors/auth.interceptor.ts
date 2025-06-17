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
    const token = localStorage.getItem('myToken');

    const authReq = token
      ? req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`)
        })
      : req;

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        const isAdminRoute = this.router.url.startsWith('/admin');

        if (error.status === 401 && isAdminRoute) {
          console.warn('Unauthorized - redirecting to /admin/login');
          localStorage.removeItem('myToken');
          this.router.navigate(['/admin/login']);
        }

        return throwError(() => error);
      })
    );
  }
}
