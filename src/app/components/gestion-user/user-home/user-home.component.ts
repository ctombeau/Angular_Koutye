import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { EnService } from 'src/app/services/i18n/en.service';
import { FrService } from 'src/app/services/i18n/fr.service';
import { HtService } from 'src/app/services/i18n/ht.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss'],
  standalone: false
})
export class UserHomeComponent implements OnInit,AfterViewInit{
  //@ViewChild('tabRef', { static: true }) tabRef?: MatTabGroup;
  indexDetail : boolean = true;
  indexCourtier: boolean = false;
  indexMessage: boolean = false;
  userProfil: string="";
  brokerMan: string="";
  chat: string="";

  constructor(private router: Router,
    private enService: EnService,
    private frService: FrService,
    private htService: HtService,
    private gs : GlobalService
  ){}

  ngOnInit(): void {
      this.variableI18n();
  }

  ngAfterViewInit(): void {
       
   }

  variableI18n(){
    this.gs.globalVariable$.subscribe(
      val=>{
              if(val=="en"){
                this.enService.getData().subscribe(response => {
                      this.userProfil=response.userProfil;
                      this.brokerMan=response.brokerMan;
                      this.chat=response.chat;
                });
               }else if(val=="fr"){
                 this.frService.getData().subscribe(response2 => {
                      this.userProfil=response2.userProfil;
                      this.brokerMan=response2.brokerMan;
                      this.chat=response2.chat;
                  });
               }if(val=="ht"){
                 this.htService.getData().subscribe(response3 => {
                      this.userProfil=response3.userProfil;
                      this.brokerMan=response3.brokerMan;
                      this.chat=response3.chat;
                  });
               }
           }
         )
    }


 changeTab(index : any)
 {
    if(index == 0)
    {
      this.indexDetail=true;
      this.indexCourtier=false;
      this.indexMessage=false;
    }
    else if(index == 1)
    {
      this.indexDetail=false;
      this.indexCourtier=true;
      this.indexMessage=false;
    }
    else if(index == 2)
   {
      this.indexDetail=false;
      this.indexCourtier=false;
      this.indexMessage=true;
   }
  
 }
 
}
