import { TypeUser } from "./type-user.model";

export class User {
    //id : number;
    nom: string;
    prenom: string;
    username: string;
    email: string;
    password: string;
    photo : string;
    phone : string;
    nomType : string;
    
    constructor(nom: string, prenom: string, username: string, 
        email: string, password: string, photo: string, phone: string, nomType: string)
    {
        //this.id =id;
        this.nom = nom;
        this.prenom = prenom;
        this.username = username;
        this.email = email;
        this.password = password;
        this.photo = photo;
        this.phone = phone;
        this.nomType = nomType;
    }

}
