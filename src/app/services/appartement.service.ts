import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,catchError,map,of } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Appartement } from '../models/appartement.model';

@Injectable({
  providedIn: 'root'
})
export class AppartementService {
  private baseApi = environment.apiUrl;
  

  constructor(private http: HttpClient) { }

   public showByUsername(username: string) : Observable<Appartement[]>{
       return this.http.get<Appartement[]>(this.baseApi+"appartement/show-by-commune?username="+username).pipe(
          map((apps: Appartement[]) =>apps.map(app=>({
                ...app
            
          })as Appartement)),
          catchError((err:HttpErrorResponse)=>{
              if(err.status){

              }
              return [];
          })
       );
   }
}
