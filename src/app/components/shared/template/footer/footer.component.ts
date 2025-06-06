import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { EnService } from 'src/app/services/i18n/en.service';
import { FrService } from 'src/app/services/i18n/fr.service';
import { HtService } from 'src/app/services/i18n/ht.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: false
})
export class FooterComponent {

  
  constructor(private router: Router,
    private enService: EnService,
        private frService: FrService,
        private htService: HtService,
        private gs : GlobalService
  ){}

  ngOnInit(): void {
      this.variableI18n();
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

}
