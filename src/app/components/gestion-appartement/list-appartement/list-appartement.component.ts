import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, combineLatest, delay, map, Observable, Observer, of, scan, startWith, Subscription, tap } from 'rxjs';
import { Appartement } from 'src/app/models/appartement.model';
import { ImageAppartement } from 'src/app/models/image-appartement.model';
import { VideoAppartement } from 'src/app/models/video-appartement.model';
import { AppartementService } from 'src/app/services/appartement.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-list-appartement',
  templateUrl: './list-appartement.component.html',
  styleUrls: ['./list-appartement.component.scss']
})
export class ListAppartementComponent implements OnInit, OnDestroy{
  communeCtrl : FormControl=new FormControl();;
  communeValue$! : Observable<string>;
  communeValueSub! : Subscription;
  showImage : String="";
  username= sessionStorage.getItem("username");
  imagePath : any="/assets/Koutye_Folder/ImageApp/2/back.webp";
  apps:Observable<Appartement[]>= of([]);
  imagesAndvideos : string[]=[];
  imagesAndVideosApp : string[][] = [];
  listAppartement$! : Observable<any>;

  /* pour defiler l'image */
  currentIndex: number = 0;
  intervalId: any;

  /*
  images: string[] = [
    'assets/Koutye_Folder/ImageApp/2/back.webp',
    'assets/Koutye_Folder/ImageApp/2/image1.jpg',
    'assets/Koutye_Folder/ImageApp/2/image2.jpg',
    'assets/Koutye_Folder/ImageApp/2/image3.jpg'
  ];
   */
  
  images: string[]=[];

  // private initCommuneCtrl(){
     
     
  //    this.communeValueSub = this.communeCtrl.valueChanges.pipe(
  //     tap(value=>{
  //         this.communeCtrl.setValue(value);
  //     })
  //   ).subscribe();
  
  // }


  constructor(private router: Router,
    private appService : AppartementService,
    private _sanitizer: DomSanitizer
  ){}

  ngOnInit(): void {
     this.initListAppartement();
     this.startImageRotation();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  Repeat() {
    setTimeout(() => {
     
     this.Repeat();
    }, 1000);
  }
 
  
  initListAppartement(){

    const searchValue$ : Observable<string[]> = this.communeCtrl.valueChanges.pipe(
       startWith(this.communeCtrl.value)
       
    );

       this.listAppartement$ = combineLatest ([this.appService.showByUsername(this.username),
         searchValue$]).pipe(
          map(([data, comm ])=>{
               let i=0;
               let appartements = data;
               //appartements.forEach(app=>{
               /*
               for(let i=0; i<appartements.length;i++){
                
                  console.log(appartements[i].imageAppartements[0].image)
                   for(let j=0;j<appartements[i].imageAppartements.length;j++){
                      this.imagesAndVideosApp[i][j]=appartements[i].imageAppartements[j].image;
                   }
                
                   for(let k=0;k<appartements[i].videoAppartements.length;k++){
                     this.imagesAndVideosApp[i][k+appartements[i].imageAppartements.length]=appartements[i].videoAppartements[k].video;
                 }
                
                }    
                 */ 
                //   i=i+1;
               //});

               appartements.forEach(app=>{

                    for(let i=0; i<app.imageAppartements.length;i++){
                         app.imageAppartements[i].image=app.imageAppartements[i].image.substr(53)
                    }
                
               });
               console.log(appartements[0].imageAppartements[0].image.substr(53))
               this.showImage=appartements[0].imageAppartements[0].image.substr(53);
               if(comm==null){
                  return appartements;
               }
               else{
                   appartements = appartements.filter((app: Appartement)=>
                                        app.adresse.commune.toString().toLowerCase()
                                        .startsWith(comm.toString().toLowerCase()))
                 
                   return appartements;
                }
              
               //return appartements;
           }));
  }

  startImageRotation(): void {
    this.intervalId = setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) //% this.images.length;
    }, 5000);  // 5000 ms = 5 secondes
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

  modelChanged(event: any) {
     return event;
  }
}
