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
  boolSpinner$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private token = "token";
  private nom = "nom";
  private prenom = "prenom";
  private username="username";
  private email= "email";
  private phone = "phone";
  private photo="photo";
  private type="type";
  private id="id"

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
       this.boolSpinner$.next(true);
       return this.http.post<any>(this.url+"login",user).pipe(
       
       map((response : any)=>{
           
           if(response.success===true)
           {
              this.boolSpinner$.next(false);
              this.saveUserInfo(response.object);
              this._message$.next("");
              this.isLoggedIn.next(true);
              this.isError.next(false);
           }
           else{
               this.isLoggedIn.next(false);
               this.isError.next(true);
               this.boolSpinner$.next(false);
               this._message$.next("Nom utilisateur ou modepasse incorrect...");
           }
              
       }),
       catchError((error : HttpErrorResponse)=>{
          if(error.status==0 || error.status==500)
          {
             this.boolSpinner$.next(false);
             this.isError.next(true);
             this.isLoggedIn.next(false);
             this._message$.next("nous n'arrivons pas à contacter le serveur");
          }
          else if(error.status==401)
          {
             this.boolSpinner$.next(false);
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
      return this.http.post(this.url+"user/add",user);
      
  }

  public putUser(id: number,user: User){
     return this.http.put(this.url+"user/update/"+id,user);
  }

  public processForgotPassword(email: string){
       return this.http.get(this.url+"send-email?emailTo="+ email);
  }

  public processResetPassword(body : any){
     return this.http.post(this.url+"reset-password", body);
  }
  
  public getUser(username : string) : Observable<any>
  {
     return this.http.get(this.url + "user?username="+username);
     
  }

  public sendMailAttachUser(emailFrom: string,emailTo : string): Observable<any>{
      
      return this.http.get(this.url+"send-email-attachment?emailFrom="+emailFrom+"&emailTo="+emailTo);
  }

  public getAttachUsers(username: string)
  {
     return this.http.get(this.url+"show-attach-users?username="+username);      
  }

  public setPicture(formData: FormData){
      return this.http.post(this.url+"update-picture",formData);
  }

  public saveUserInfo(data : any): void
  {
      sessionStorage.setItem(this.token, data["access-token"]);
      sessionStorage.setItem(this.id,data["user-info"].utilisateurId)
      sessionStorage.setItem(this.username,data["user-info"].username);
      sessionStorage.setItem(this.nom,data["user-info"].nom);
      sessionStorage.setItem(this.prenom,data["user-info"].prenom);
      sessionStorage.setItem(this.photo,data["user-info"].photo);
      sessionStorage.setItem(this.phone,data["user-info"].phone);
      sessionStorage.setItem(this.email,data["user-info"].email);
      sessionStorage.setItem(this.type,data["user-info"].nomType);
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
     sessionStorage.removeItem(this.id);
     this.isLoggedIn.next(false);
  }

  logout(){
   this.removeUserInfo();
    this.router.navigate(['/']);
  }
}
