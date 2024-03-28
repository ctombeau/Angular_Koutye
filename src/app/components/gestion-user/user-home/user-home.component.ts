import { AfterViewInit, Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements AfterViewInit{
  
  @Input("tabRef") tabRef : any;

  ngAfterViewInit(): void {
      console.log(this.tabRef);
  }
 
}
