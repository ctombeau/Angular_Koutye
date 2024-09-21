import { Component, OnInit } from '@angular/core';
import { Appartement } from 'src/app/models/appartement.model';
import { AppartementService } from 'src/app/services/appartement.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    
   
    ngOnInit(): void{
        
    }

    constructor( private appService : AppartementService){

    }

   
  
}
