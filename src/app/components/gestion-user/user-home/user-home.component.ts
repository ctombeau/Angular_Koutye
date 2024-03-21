import { AfterViewInit, Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements AfterViewInit{
  
  @Input() tabRef : any;
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
      
  }
 
}
