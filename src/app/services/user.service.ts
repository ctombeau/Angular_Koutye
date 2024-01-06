import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { UserLogin } from '../models/user-login.model';
import { Observable, catchError, map } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Injectable({
  providedIn: 'root'
})
export class UserService {
   
  private url = environment.apiUrl;

  constructor(
    private http : HttpClient
  ) { 
     console.log(environment.apiUrl)
  }

  public postLogin(user : UserLogin) 
  {
       return this.http.post<any>(this.url+"login",user).pipe(
     
       map((response : HttpResponse<any>)=>{
           if(response.status===200)
           {
               console.log(response);
           }
       }),
       catchError((error : HttpErrorResponse)=>{
           return "";
       })
       
       );
     
  }

}
