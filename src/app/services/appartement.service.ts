import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable,catchError,map,of, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Appartement } from '../models/appartement.model';

@Injectable({
  providedIn: 'root'
})
export class AppartementService {
  private baseApi = environment.apiUrl;
 
  constructor(private http: HttpClient) { }

   public showByUsername(username: any):Observable<any> {
       return this.http.get<any>(this.baseApi+"appartement/show-by-username?username="+username)
       .pipe(
        
        map((data: any)=>{
          if(data.success==true){
            return of(data.object);
          }
          else
            return of([]);
         }),
          catchError((err:HttpErrorResponse)=>{
              if(err.status){

              }
              return [];
          })
       );
       
   }
}
