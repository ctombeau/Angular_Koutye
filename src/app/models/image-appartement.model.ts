import { Appartement } from "./appartement.model";

export class ImageAppartement{
    //id: number;
    image: string;
    appartement: Appartement;

    constructor(image: string, appartement:Appartement){
        this.image=image;
        this.appartement=appartement;
    }
}