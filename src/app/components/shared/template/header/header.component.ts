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
   french : string="";
   english: string="";
   creole: string="";
   home: string="";
   apartment : string="";
   user : string="";
   userM : string="";
   log: string="";
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
      this.variableI18n();
      //this.title= this.configLoaderService.appTitle;
   }

  variableI18n(){
        this.gs.globalVariable$.subscribe(
           val=>{
               if(val=="en"){
                 this.enService.getData().subscribe(response => {
                      this.french = response.french;
                      this.english = response.english;
                      this.creole = response.creole;
                      this.home= response.home;
                      this.apartment = response.apartment;
                      this.user = response.user;
                      this.userM = response.userM;
                      this.log = response.log;
                  });
               }else if(val=="fr"){
                 this.frService.getData().subscribe(response2 => {
                      this.french = response2.french;
                      this.english = response2.english;
                      this.creole = response2.creole;
                      this.home= response2.home;
                      this.apartment = response2.apartment;
                      this.user = response2.user;
                      this.userM = response2.userM;
                      this.log = response2.log;
                  });
               }if(val=="ht"){
                 this.htService.getData().subscribe(response3 => {
                      this.french = response3.french;
                      this.english = response3.english;
                      this.creole = response3.creole;
                      this.home= response3.home;
                      this.apartment = response3.apartment;
                      this.user = response3.user;
                      this.userM = response3.userM;
                      this.log = response3.log;
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
