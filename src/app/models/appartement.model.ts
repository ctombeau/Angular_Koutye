import { Adresse } from "./adresse.model";
import { ImageAppartement } from "./image-appartement.model";
import { User } from "./user.model";
import { VideoAppartement } from "./video-appartement.model";

export class Appartement{
    //id : number;
    description: string;
    prix: number;
    devise: string;
    adresse : Adresse;
    user : User;
    imageAppartements: ImageAppartement[];
    videoAppartements : VideoAppartement[];
    
    constructor(description: string,prix: number, devise: string,adresse:Adresse,
        imgs:ImageAppartement[],videos:VideoAppartement[], user:User){
        //this.id = id;
        this.description = description;
        this.prix=prix;
        this.devise=devise;
        this.adresse=adresse;
        this.user=user;
        this.imageAppartements=imgs;
        this.videoAppartements=videos;
    }

}