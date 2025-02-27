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
  imagePath : any;
  apps:Observable<Appartement[]>= of([]);
  imagesAndvideos : string[]=[];
  imagesAndVideosApp : string[][] = [];
  listAppartement$! : Observable<any>;
  images: any[][]=[];

  /* pour defiler l'image */
  currentIndex: number = 0;
  intervalId: any;
  imgLength : number=0;
  currentElement: string="";


  constructor(private router: Router,
    private appService : AppartementService,
    private _sanitizer: DomSanitizer
  ){}

  ngOnInit(): void {
     this.initListAppartement();
     //this.startImageRotation();
     console.log(this.images)
  }
  /*
    Notes : Le tableau images contient les images, c'est sur lui qu'on doit travailler pour
    afficher les images dans le template.
  */

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
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
               
               let k=0;
               appartements.forEach(app=>{
                  
                  for(let i=0; i<app.imageAppartements.length;i++){
                         app.imageAppartements[i].image=app.imageAppartements[i].image.substr(53)
                         
                   }
                   this.images[k]=app.imageAppartements;
                   k=k+1;    
               });
               console.warn(this.images)
               if(comm==null){
                  return appartements;
               }
               else{
                   appartements = appartements.filter((app: Appartement)=>
                                        app.adresse.commune.toString().toLowerCase()
                                        .startsWith(comm.toString().toLowerCase()))
                 
                   return appartements;
                }
              
           }));
  }

  startImageRotation(): void {
    this.intervalId = setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        console.log(this.currentIndex)
    }, 5000);  
  }

  

  imageRotation(imgs : {id: number, image: string}[]): any {
    let index = 0;
    console.log(imgs)
    setInterval(() => {
      if (index <  Object.entries(imgs).length) {
        this.currentElement = imgs[index].image;
        index++;
      } else {
        index = 0; // Recommencer à partir du début du tableau après avoir parcouru tous les éléments
      }
    }, 5000); // 5000 ms = 5 secondes
  }

  sleep(ms : number) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
