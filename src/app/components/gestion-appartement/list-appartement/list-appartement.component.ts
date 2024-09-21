import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, delay, Observable, Observer, of, Subscription } from 'rxjs';
import { Appartement } from 'src/app/models/appartement.model';
import { ImageAppartement } from 'src/app/models/image-appartement.model';
import { VideoAppartement } from 'src/app/models/video-appartement.model';
import { AppartementService } from 'src/app/services/appartement.service';

@Component({
  selector: 'app-list-appartement',
  templateUrl: './list-appartement.component.html',
  styleUrls: ['./list-appartement.component.scss']
})
export class ListAppartementComponent implements OnInit{
  showImage : String="";
  username= sessionStorage.getItem("username");

  apps:Appartement[]= [];
  imagesAndvideos : string[]=[];
  imagesAndVideosApp : string[][] = [];

  fgSearch = new FormGroup({
    commune : new FormControl("",[
       Validators.required
    ])
    
})


  constructor(private router: Router,
    private appService : AppartementService
  ){}
  ngOnInit(): void {
    //this.Repeat(); 
     this.listAppartementByUsername(this.username);
     
     console.log(this.apps) 
  }

  Repeat() {
    setTimeout(() => {
     // this.FunctionSlide();
     this.Repeat();
    }, 1000);
  }
 
  listAppartementByUsername(username : any){
    this.appService.showByUsername(username).subscribe(
        (data:any)=>{ 
           if(data.success==true){
                this.apps=data.object;
                for(let i=0;i<this.apps.length;i++){
                      this.passImage(this.apps[i].imageAppartements);
                      this.passVideo(this.apps[i].videoAppartements);
                      this.imagesAndVideosApp.push(this.imagesAndvideos);
                      this.imagesAndvideos=[];
                }
                //console.log(this.imagesAndvideos)
                //console.warn(this.apps[0].imageAppartements[0].image)
                console.warn(this.imagesAndVideosApp[0][0])
           }
        },
        (error : HttpErrorResponse)=>{
            if(error.status){

            }
        }
        
    );
  }
  
  initListAppartement(){
       
  }

  listAppartementByCommune(commune : any): Observable<Appartement[]>{
    
    return of([]);
  }

  passImage(images : ImageAppartement[]){
     for (let i of images){
        this.imagesAndvideos.push(i.image.replaceAll('\\','/'));
     }

  }
  passVideo(videos: VideoAppartement[]){
    for(let j of videos){
       this.imagesAndvideos.push(j.video.replaceAll('\\','/'));
    }
  }

  passImageageAndVideo(imgs: string[]): any {
      for(let k of imgs){
          delay(5000)
          return k;
      }
  }
}
