import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    
  path : string = "";

  constructor() { }

  ngOnInit(): void {
      this.showImages();
      //setInterval(this.showImages,15000);
      setInterval(()=>{
        this.showImages();
      },15000);
  }

   showImages()
   {
     
      setTimeout(() => {
        this.path = "../../../assets/images/back.jpg";
      }, 0);

      setTimeout(() => {
        this.path = "../../../assets/images/back2.jpg";
      }, 5000);

      setTimeout(() => {
        this.path = "../../../assets/images/back3.jfif";
      }, 10000);
   }

}
