import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { UserLogin } from '../models/user-login.model';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
   
  private url = environment.apiUrl;

  private _message$ : BehaviorSubject<string> = new BehaviorSubject<string>("");
  
   private _routeMessage$: BehaviorSubject<string> = new BehaviorSubject<string>("");

  get message$(): Observable<string>
  {
      return this._message$.asObservable();
  }

  get routeMessage$(): Observable<string>
  {
      return this._routeMessage$.asObservable();
  }
  
  setMessage(value : string) : void
  {
     this._message$.next(value);
  }

  setRouteMessage(value : string) : void
  {
     this._routeMessage$.next(value);
  }

  constructor(
    private http : HttpClient,
    private router : Router,
    private route : ActivatedRoute
  ) { 
     //console.log(environment.apiUrl)
  }

  public postLogin(user : UserLogin) : Observable<any>
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

   /*
   const navigationExtras: NavigationExtras = {
      queryParams: { message : this.setMessage("utilisateur enregistre avec success") },
    };
    */
     console.log(user);
    // this.router.navigate(['/'],navigationExtras);
     
     
      return this.http.post(this.url+"user/add",user).pipe(
         map((response: any)=>{
               console.log(response);
               if(response.success==true)
               {
                  this.setRouteMessage("Utilisateur créé avec succès");
                  this.router.navigate(['/']);
               }
         }),
         catchError((error : HttpErrorResponse)=>{
            console.log(error);
            return "";
         })
      )
      
  }
  
}
