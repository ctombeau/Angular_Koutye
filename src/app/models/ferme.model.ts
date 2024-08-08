import { Appartement } from "./appartement.model";

export class Ferme{
    //id: number;
    debut: Date;
    fin:Date;
    montant: number;
    appartement: Appartement;

    constructor(debut: Date, fin:Date,montant:number, appartement: Appartement){
        this.debut=debut;
        this.fin = fin;
        this.montant=montant;
        this.appartement=appartement;
    }
}