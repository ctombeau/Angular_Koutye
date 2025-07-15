import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VideoAppService {
   _videos : any[]=[];

   
  constructor() { }

  public get videos(): any[]{
      return this._videos;
  }

  public set videos(newVideos : any[]){
     this._videos=newVideos;
  }
   
}
