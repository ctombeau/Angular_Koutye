import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit,AfterViewInit{
  //@ViewChild('tabRef', { static: true }) tabRef?: MatTabGroup;
  indexDetail : boolean = true;
  indexCourtier: boolean = false;
  indexMessage: boolean = false;

  constructor(private router: Router){}

  ngOnInit(): void {
      //console.log(this.tabRef?.selectedIndex);
     // this.tabRef?.selectedIndex ?? 0;
  }
  
 
  ngAfterViewInit(): void {
      //console.log(this.tabRef?.selectedIndex);
      //this.tabRef?.selectedIndex = 0;
      
        
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
