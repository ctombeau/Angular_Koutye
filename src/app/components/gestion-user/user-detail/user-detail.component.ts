import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  standalone: false
})
export class UserDetailComponent implements OnInit{
   user : any;
   username: string = sessionStorage.getItem("username") ?? "";
   email: string = sessionStorage.getItem("email")?? "";
   prenom: string = sessionStorage.getItem("prenom")?? "";
   nom: string = sessionStorage.getItem("nom")?? "";
   phone: string= sessionStorage.getItem("phone")?.toUpperCase() ?? "";
   imageUrl: string | ArrayBuffer | null="assets/images/user.jpg";
   selectedFile: File | null = null;

    constructor(
      private userService : UserService
    ){}

    ngOnInit(): void {
       this.getUser();
       //console.log("username session: "+sessionStorage.getItem("username"))
    }
    
    public getUser() : void
    {
       console.log("On test getUser()");
       this.userService.getUser(this.username).subscribe(
           (data: any)=>{
               this.user = data;
               console.log(this.user);
           },
           (error: HttpErrorResponse)=>{
              console.log("erreur constatee: "+ error.message);
           }
       );
    }

    getPicture(event: any){
      const input = event.target as HTMLInputElement;
      if (input?.files?.length) {
         this.selectedFile = input.files[0];
        const reader = new FileReader();
  
        reader.onload = () => {
          this.imageUrl = reader.result; // Met l'URL de l'image dans `imageUrl`
          console.log(this.imageUrl)
        };
  
        reader.readAsDataURL(this.selectedFile); // Convertit le fichier en URL pour l'affichage
        if(this.selectedFile){
         const formData = new FormData();
         formData.append('username',this.username);
         formData.append('photo', this.selectedFile, this.selectedFile.name);
   
         this.userService.setPicture(formData).subscribe(response => {
           console.log('Fichier téléchargé avec succès!', response);
         }, error => {
           console.error('Erreur de téléchargement', error);
         });
        }
      }
       
    }
}
