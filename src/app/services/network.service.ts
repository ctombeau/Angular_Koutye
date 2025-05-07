import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  private onlineSubject = new BehaviorSubject<boolean>(navigator.onLine);
  public online$ = this.onlineSubject.asObservable();

  constructor(private ngZone: NgZone) {
    window.addEventListener('online', () => {
      this.ngZone.run(() => this.onlineSubject.next(true));
    });

    window.addEventListener('offline', () => {
      this.ngZone.run(() => this.onlineSubject.next(false));
    });
  }

  isOnline(): boolean {
    return this.onlineSubject.value;
  }
}
