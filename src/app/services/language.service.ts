import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private keyLanguage = "userLanguage";
  private _userLanguage= "";
  private supportedLanguage = ['en','fr'];

  constructor(
    private translate : TranslateService
  ) { 
     this.initLanguage();
     this.translate.use(this._userLanguage);
  }

   public initLanguage()
   {
      const value = localStorage.getItem(this.keyLanguage);
      if(value!=null)
      {
          this._userLanguage= value;
      }
      else
      {
         const browserLanguage = navigator.language.split("-")[0];
         this._userLanguage='en';
         if(this.supportedLanguage.includes(browserLanguage))
         {
            this._userLanguage = browserLanguage;
            localStorage.setItem(this._userLanguage, browserLanguage);
         }
      }
   }

   public setLanguage(language : string)
   {
      this._userLanguage=language;
      localStorage.setItem(this.keyLanguage,this._userLanguage);
      this.translate.use(this._userLanguage);
   }

   get userLanguage()
   {
      return this._userLanguage;
   }

   getAvailableLanguages()
   {
     return this.supportedLanguage;
   }
}
