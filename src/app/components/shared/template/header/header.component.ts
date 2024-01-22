import { Component } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    constructor( private languageService: LanguageService)
    {

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
}
