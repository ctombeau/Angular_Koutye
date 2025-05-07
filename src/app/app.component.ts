import { Component, OnInit } from '@angular/core';
import { LanguageService } from './services/language.service';
import {Store, select} from '@ngrx/store';
import { initAction, changeUsername } from './state/koutye-action';
import { Observable } from 'rxjs';
import { NetworkService } from './services/network.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Koutye';
  isOnline=true;

   constructor(private languageService: LanguageService,
    private store : Store,
    private networkService : NetworkService
   ){
       this.networkService.online$.subscribe(status=>{
           this.isOnline=status;
       })
   }

   public user$ : Observable<any> ={} as Observable<any>;

   ngOnInit(): void {
       this.store.dispatch(initAction())
       //this.user$ = this.store.select((state: any)=>state.root.user);
       this.user$ = this.store.pipe(select((state: any)=>state.root.user));
   }

   public changeUsername(): void{
      this.store.dispatch(changeUsername({username:`ctombeau ${Math.random()}`}))
   }

   reloadPage(){
      window.location.reload();
   }
}
