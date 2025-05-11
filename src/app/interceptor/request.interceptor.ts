import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private userService: UserService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   /*
    const token = this.userService.getToken();

      if(token !== null)
      {
        if(!request.url.includes("/login"))
        {
             let clone = request.clone({
              headers : request.headers.set('Authorization','Bearer '+token)
            });
            return next.handle(clone)
            
        }
        else
           return next.handle(request)
         
      }
      else
        return next.handle(request)
     */
      
        const excludedUrls = ['/api/login', '/api/user/add', '/api/send-emailc']; // ajoute ici les endpoints publics
        const isPublic = excludedUrls.some(url => request.url.includes(url));
    
        let authReq = request;
    
        if (!isPublic) {
          const token = this.userService.getToken();
          if (token) {
            authReq = request.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`
              }
            });
          }
        }
    
        return next.handle(authReq).pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
              this.userService.logout();
            }
    
            return throwError(() => error);
          })
        );
      
  }

  interceptError(request :HttpRequest<unknown>, next: HttpHandler){
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Token expiré ou invalide
          localStorage.removeItem('token');
          this.router.navigate(['/']);
        }
        return throwError(() => error);
      })
    );
   }
      
}
