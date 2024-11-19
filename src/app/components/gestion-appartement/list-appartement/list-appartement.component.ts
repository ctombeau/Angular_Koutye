import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, combineLatest, delay, map, Observable, Observer, of, startWith, Subscription, tap } from 'rxjs';
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
  commune! : FormControl;
  communeValue$! : Observable<string>;
  communeValueSub! : Subscription;
  showImage : String="";
  username= sessionStorage.getItem("username");
  imagePath : any;
  apps:Observable<Appartement[]>= of([]);
  imagesAndvideos : string[]=[];
  imagesAndVideosApp : string[][] = [];
  listAppartement$! : Observable<any>;

  private initCommuneCtrl(){
     this.commune = new FormControl();
     
     this.communeValueSub = this.commune.valueChanges.pipe(
      tap(value=>{
          this.commune.setValue(value);
      })
    ).subscribe();
  
  }


  constructor(private router: Router,
    private appService : AppartementService,
    private _sanitizer: DomSanitizer
  ){}

  ngOnInit(): void {
     this.initCommuneCtrl();
     this.initListAppartement();
  }

  ngOnDestroy(): void {
    this.communeValueSub.unsubscribe();
  }

  Repeat() {
    setTimeout(() => {
     // this.FunctionSlide();
     this.Repeat();
    }, 1000);
  }
 
  
  initListAppartement(){
    const searchValue$ = this.commune.valueChanges.pipe(
        startWith(this.commune.value)
    )

    console.log("SearchValue: ",searchValue$)
       this.listAppartement$ = combineLatest ([this.appService.showByUsername(this.username),
         searchValue$]).pipe(
          map(([data, comm ])=>{
               let appartements = data;
               console.log(data)
               console.log("commune:",comm)
               return appartements;
           }));
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
