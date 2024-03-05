import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { UserLogin } from '../models/user-login.model';
import { BehaviorSubject, Observable, catchError, map } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
   
  private url = environment.apiUrl;

  private _message$ : BehaviorSubject<string> = new BehaviorSubject<string>("");
  get message$(): Observable<string>
  {
      return this._message$.asObservable();
  }

  constructor(
    private http : HttpClient,
    private router : Router
  ) { 
     //console.log(environment.apiUrl)
  }

  public postLogin(user : UserLogin) 
  {
       return this.http.post<any>(this.url+"login",user).pipe(
       
       map((response : any)=>{
           //console.log(response.success);
           if(response.success===true)
           {
              console.log(response);
              this._message$.next("");
               this.router.navigate(["/home"]);
           }
           else
              this._message$.next("Nom utilisateur ou modepasse incorrect...");
       }),
       catchError((error : HttpErrorResponse)=>{
          if(error.status==0 || error.status==500)
          {
             this._message$.next("nous n'arrivons pas a contacter le serveur");
          }
          else if(error.status==401)
          {
             this._message$.next("Nom utilisateur et/ou mot de passe incorrect...");
          }
           return "";
       })
       
       );
     
  }

  public postUser(user : User)
  {
     console.log(user);
      return this.http.post(this.url+"user/add",user).pipe(
         map((response: any)=>{
               console.log(response);
               if(response.success==true)
               {
                  
               }
         }),
         catchError((error : HttpErrorResponse)=>{
            console.log(error);
            return "";
         })
      )
  }
  
}
