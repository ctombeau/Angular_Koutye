import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { UserLogin } from '../models/user-login.model';
import { BehaviorSubject, Observable, catchError, map, of, shareReplay } from 'rxjs';
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

  isError : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  

  user : any ;
  isLoggedIn = new BehaviorSubject<boolean>(false);
  private token = "token";
  private nom = "nom";
  private prenom = "prenom";
  private username="username";
  private email= "email";
  private phone = "phone";
  private photo="photo";

  getToken(): string | null{
       return sessionStorage.getItem(this.token);
  }
  

  httpOptions = {
   headers: new HttpHeaders({
     'Content-Type':  'application/json',
     'Access-Control-Allow-Origin': '*',
     'Authorization': 'Bearer ' + sessionStorage.getItem("token")
   })
  };
  
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
           
           if(response.success===true)
           {
              //console.log(response.object["user-info"].username);
              //console.log(response.object["access-token"]);
              //this.tokenUser= response.object["access-token"];
              this.saveUserInfo(response.object);
              this._message$.next("");
              this.isLoggedIn.next(true);
              this.isError.next(false);
              //this.router.navigate(["/home"]);
              
           }
           else{
               this.isLoggedIn.next(false);
               this.isError.next(true);
               this._message$.next("Nom utilisateur ou modepasse incorrect...");
           }
              
       }),
       catchError((error : HttpErrorResponse)=>{
          if(error.status==0 || error.status==500)
          {
             this.isError.next(true);
             this.isLoggedIn.next(false);
             this._message$.next("nous n'arrivons pas a contacter le serveur");
          }
          else if(error.status==401)
          {
             this.isError.next(true);
             this.isLoggedIn.next(false);
             this._message$.next("Nom utilisateur et/ou mot de passe incorrect...");
          }
           return "";
       })
       
       );
     
  }

  public postUser(user : User)
  {
      return this.http.post(this.url+"user/add",user).pipe(
         map((response: any)=>{
               if(response.success===true)
               {
                  this.setRouteMessage("Utilisateur créé avec succès");
                  this.router.navigate(['/']);
                  shareReplay();
               }
         }),
         catchError((error : HttpErrorResponse)=>{
            return "";
         })
      )
      
  }
  
  public getUser(username : string) : Observable<any>
  {
     return this.http.get(this.url + "user?username="+username)
     .pipe(
        map((response : any)=>{
            if(response.success===true)
            {
                this.user = response.object;
            }
        }),
        catchError((error : HttpErrorResponse)=>{


            return "";
        })
     )
     
  }

  public getAttachUsers(username: string)
  {
     return this.http.get(this.url+"show-attach-users?username="+username).pipe(
        map((response)=>{
            console.log(response);
        }
     ));
  }

  public saveUserInfo(data : any): void
  {
      sessionStorage.setItem(this.token, data["access-token"]);
      sessionStorage.setItem(this.username,data["user-info"].username);
      sessionStorage.setItem(this.nom,data["user-info"].nom);
      sessionStorage.setItem(this.prenom,data["user-info"].prenom);
      sessionStorage.setItem(this.photo,data["user-info"].photo);
      sessionStorage.setItem(this.phone,data["user-info"].phone);
      sessionStorage.setItem(this.email,data["user-info"].email);
  }

  public removeUserInfo() : void
  {
     sessionStorage.removeItem(this.token);
     sessionStorage.removeItem(this.nom);
     sessionStorage.removeItem(this.prenom);
     sessionStorage.removeItem(this.username);
     sessionStorage.removeItem(this.email);
     sessionStorage.removeItem(this.phone);
     sessionStorage.removeItem(this.photo);
     this.isLoggedIn.next(false);
  }
}
