import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { Appartement } from 'src/app/models/appartement.model';
import { AppartementService } from 'src/app/services/appartement.service';

@Component({
  selector: 'app-list-appartement',
  templateUrl: './list-appartement.component.html',
  styleUrls: ['./list-appartement.component.scss']
})
export class ListAppartementComponent implements OnInit{
  showImage : String="";
  username= sessionStorage.getItem("username");
  private listApps$: Subscription = new Subscription();
  fgSearch = new FormGroup({
    commune : new FormControl("",[
       Validators.required
    ])
    
})

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

  constructor(private router: Router,
    private appService : AppartementService
  ){}
  ngOnInit(): void {
    this.Repeat(); 
     this.listAppartementByUsername(this.username);
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

  listAppartementByUsername(username : any): Observable<Appartement[]>{
     this.listApps$=this.appService.showByUsername(username).subscribe();
     return of([]);
  }

  listAppartementByCommune(commune : any): Observable<Appartement[]>{
    
    return of([]);
 }
}
