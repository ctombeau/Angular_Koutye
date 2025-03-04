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
  currentIndex: number []= [];
  intervalId: any;
  imgLength : number=0;
  currentElement: string="";
  

  constructor(private router: Router,
    private appService : AppartementService,
    private _sanitizer: DomSanitizer,
  ){}

  ngOnInit(): void {
     this.initListAppartement();
     this.startImageRotation();
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
               
               if(comm==null || comm.length==0){
                  this.transformImage(appartements);
                  
                   console.warn("comm null ou vide")
                   console.log(appartements)
                  return appartements;
               }
               else {
                  console.warn("comm non null et non vide")
                  console.log(appartements)
                  
                   appartements = appartements.filter((app: Appartement)=>
                                        app.adresse.commune.toString().toLowerCase()
                                        .startsWith(comm.toString().toLowerCase())
                      
                  );
                      
                  return appartements;
              }
              //return appartements;
           }));
          
  }

  startImageRotation(): void {
    this.intervalId = setInterval(() => {
        for(let i=0; i<this.currentIndex.length; i++)
          this.currentIndex[i] = (this.currentIndex[i] + 1) % this.images[i].length;
         console.log(this.currentIndex)
    }, 5000);  
  }
 
  transformImage(appartements : Appartement[]){
    let k=0;
    appartements.forEach(app=>{
                  
      for(let i=0; i<app.imageAppartements.length;i++){
             app.imageAppartements[i].image=app.imageAppartements[i].image.substr(53)
             
       }
       this.images[k]=app.imageAppartements;
       this.currentIndex[k]=app.imageAppartements.length;
       k=k+1;    
   });
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
