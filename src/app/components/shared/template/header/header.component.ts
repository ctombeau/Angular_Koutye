import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { EnService } from 'src/app/services/i18n/en.service';
import { FrService } from 'src/app/services/i18n/fr.service';
import { HtService } from 'src/app/services/i18n/ht.service';
import { LanguageService } from 'src/app/services/language.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false
})
export class HeaderComponent implements OnInit{
   checkUrl : boolean= false;
   nom = sessionStorage.getItem("nom");
   prenom  = sessionStorage.getItem("prenom");
   //public title = '';

    constructor( private languageService: LanguageService,
      private userService : UserService,
      private router: Router,
      private enService: EnService,
      private frService: FrService,
      private htService: HtService,
      private gs : GlobalService
   ){
       //console.log(this.router.url)
       this.checkUrl = this.router.url != '/' && this.router.url != '/reset-password' &&
                       this.router.url!='/forgot-password' && this.router.url != '/register' &&
                       this.router.url!='/user/add' && this.router.url!='/user/forgot-password'
                       && this.router.url!='/user/reset-password';
    }
   ngOnInit(): void {
      //this.title= this.configLoaderService.appTitle;
   }

  variableI18n(){
        this.gs.globalVariable$.subscribe(
           val=>{
               if(val=="en"){
                 this.enService.getData().subscribe(response => {
                      
                  });
               }else if(val=="fr"){
                 this.frService.getData().subscribe(response2 => {
                      
                  });
               }if(val=="ht"){
                 this.htService.getData().subscribe(response3 => {
                      
                  });
               }
           }
         )
    }
     
    actionMenu()
    {
       console.log("Test bouton");
    }

    public translateWord(language : string)
    {
       console.log(language);
       this.gs.setGlobalVariable(language);
       this.languageService.setLanguage(language);
    }

    public logout() : void
    {
        this.userService.logout();
    }

    /*
    applyStyles() {
      const styles = {'font-family' : this.title};
      return styles;
   }
   */
}
