import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../models/client';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
   headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  private baseApi = environment.apiUrl;
  constructor(private http: HttpClient) { }

    login(client: Client): any {
      return this.http.post(this.baseApi + '/login', client, { headers: this.headers });
    }

    logout(client: Client): any {
      return this.http.post(this.baseApi + '/logout', client, { headers: this.headers });
    }

    findUsers() {
      return this.http.get(this.baseApi + '/listUsers', { headers: this.headers });
    }
}
