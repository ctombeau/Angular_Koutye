import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private userService: UserService,
    private router : Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    return next.handle(request); 
  }
}
