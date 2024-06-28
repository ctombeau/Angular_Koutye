import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
   showImage : String="";
  imageObject1: Array<any> =[{
    image:'/assets/images/app/img1.jpg'
 },
 {
     image:'/assets/images/app/img3.jpg'
 },
 {
    image:'/assets/images/app/img5.jpg'
},
{
 image:'/assets/images/app/img7.jpg'
},
{
 image:'/assets/images/app/img9.jpg'
}
]

imageObject2: Array<any> =[{
 image:'/assets/images/app/img2.jpg'
},
{
  image:'/assets/images/app/img4.jpg'
},
{
 image:'/assets/images/app/img6.jpg'
},
{
image:'/assets/images/app/img8.jpg'
}
]
  ngOnInit(): void {
    this.Repeat();  
  }

  Repeat() {
    setTimeout(() => {
      this.FunctionSlide();
     this.Repeat();
    }, 1000);
  }

  FunctionSlide(){
     for(let i=0; i<this.imageObject1.length-1;i++){
      this.showImage=this.imageObject1[i].image;
      /*
      setInterval(() => {
        this.showImage=this.imageObject1[i+1].image;
        console.log(this.showImage)
      }, 5000);
      */
     }
  }

}
