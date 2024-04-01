import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = sessionStorage.getItem("token");

    if(token !== null || token !=="")
    { 
      //console.log(token);
      if(!request.url.includes("login"))
      {
         let clone = request.clone({
          //headers : request.headers.set('Authorization','Bearer '+token)
          setHeaders: {
            'Content-Type' : 'application/json; charset=utf-8',
            'Accept'       : 'application/json',
            Authorization: 'Bearer ${token}'
          }
        });
        return next.handle(clone);
      }
    }
    return next.handle(request);
  }
}
