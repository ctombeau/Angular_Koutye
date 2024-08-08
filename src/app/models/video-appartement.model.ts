import { Appartement } from "./appartement.model";

export class VideoAppartement{
   //id: number;
   video: string;
   appartement: Appartement;
   
   constructor(video: string, appartement: Appartement){
      this.video=video;
      this.appartement=appartement;
   }
}