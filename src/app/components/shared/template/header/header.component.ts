import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from 'src/app/services/language.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
   checkUrl : boolean= false;
    constructor( private languageService: LanguageService,
      private userService : UserService,
      private router: Router)
    {
       //console.log(this.router.url)
       this.checkUrl = this.router.url != '/' && this.router.url != '/reset-password' &&
                       this.router.url!='/forgot-password' && this.router.url != '/register';
    }
     
    actionMenu()
    {
       console.log("Test bouton");
    }

    public translateWord(language : string)
    {
       console.log(language);
       this.languageService.setLanguage(language);
    }

    public logout() : void
    {
        this.userService.removeUserInfo();
        this.router.navigate(['/']);
    }
}
