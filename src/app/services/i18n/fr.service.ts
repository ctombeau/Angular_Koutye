import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FrService {

  private jsonUrl = 'assets/i18n/fr.json'; // Chemin du fichier JSON
  
    constructor(private http: HttpClient) {}
  
    getData(): Observable<any> {
      return this.http.get<any>(this.jsonUrl);
    }
}
