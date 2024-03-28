import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   /*
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Gestion de l'erreur ici
        //Rediriger l'utilisateur vers une page d'erreur
        console.error("Erreur dans l'intercepteur: "+error);
         return throwError(error);
      })
    );
    */
    return next.handle(request); 
  }
}
