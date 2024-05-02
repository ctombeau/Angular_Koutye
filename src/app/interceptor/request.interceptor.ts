import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    
    //const token = sessionStorage.getItem("token");
    const token = this.userService.getToken();

    console.log("token interceptor: "+token)

      if(token !== null)
      {
        if(!request.url.includes("/login"))
        {
             let clone = request.clone({
              headers : request.headers.set('Authorization','Bearer '+token)
            });
            return next.handle(clone);
        }
        return next.handle(request);
      }
      return next.handle(request);
    
  }
}
