import { Component, OnInit } from '@angular/core';
import { LanguageService } from './services/language.service';
import {Store, select} from '@ngrx/store';
import { initAction, changeUsername } from './state/koutye-action';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Koutye';

   constructor(private languageService: LanguageService,
    private store : Store
   ){}

   public user$ : Observable<any> ={} as Observable<any>;

   ngOnInit(): void {
       this.store.dispatch(initAction())
       //this.user$ = this.store.select((state: any)=>state.root.user);
       this.user$ = this.store.pipe(select((state: any)=>state.root.user));
   }

   public changeUsername(): void{
      this.store.dispatch(changeUsername({username:`ctombeau ${Math.random()}`}))
   }
}
