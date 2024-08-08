export class Adresse{
    //id: number;
    numero: number;
    rue: string;
    commune: string;
    departement: string;
    pays: string;
    constructor(numero:number, rue:string,commune:string, departement:string,pays: string){
        this.numero=numero;
        this.rue=rue;
        this.commune=commune;
        this.departement=departement;
        this.pays=pays;
    }
}