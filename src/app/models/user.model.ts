import { TypeUser } from "./type-user.model";

export class User {
    //utilisateurId: number;
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
        //this.utilisateurId =utilisateurId;
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
