import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HtService {

   private jsonUrl = 'assets/i18n/ht.json'; // Chemin du fichier JSON
    
      constructor(private http: HttpClient) {}
    
      getData(): Observable<any> {
        return this.http.get<any>(this.jsonUrl);
      }
}
