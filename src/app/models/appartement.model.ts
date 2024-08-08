import { Adresse } from "./adresse.model";
import { User } from "./user.model";

export class Appartement{
    //id : number;
    description: string;
    adresse : Adresse;
    user : User;
    
    constructor(description: string,adresse:Adresse, user:User){
        //this.id = id;
        this.description = description;
        this.adresse=adresse;
        this.user=user;
    }

}