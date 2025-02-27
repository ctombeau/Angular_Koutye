import { Component, OnInit } from '@angular/core';
import { Appartement } from 'src/app/models/appartement.model';
import { AppartementService } from 'src/app/services/appartement.service';
import { EnService } from 'src/app/services/i18n/en.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
     private data : any;
   
    ngOnInit(): void{
      this.enService.getData().subscribe(response => {
         this.data = response;
      });
    }

    constructor( private appService : AppartementService, private enService: EnService){

    }

   
  
}
