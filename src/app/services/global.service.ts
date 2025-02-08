import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public globalVariable = new BehaviorSubject<string>("fr");
  public globalVariable$ = this.globalVariable.asObservable();

  constructor() { }

  getGlobalVariable(): Observable<string> {
    return this.globalVariable$;
  }

  setGlobalVariable(value: string) {
    this.globalVariable.next(value);
  }
}
