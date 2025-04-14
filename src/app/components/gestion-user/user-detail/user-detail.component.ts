import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  standalone: false
})
export class UserDetailComponent implements OnInit{
   user? : any;
   username: string = sessionStorage.getItem("username") ?? "" ?? this.user.username;
   email: string = sessionStorage.getItem("email")?? "" ?? this.user.email;
   prenom: string = sessionStorage.getItem("prenom")?? "" ?? this.user.email;
   nom: string = sessionStorage.getItem("nom")?? "" ?? this.user.nom;
   phone: string= sessionStorage.getItem("phone")?.toUpperCase() ?? "" ?? this.user.phone;
   type: string = sessionStorage.getItem("type") ?? "" ?? this.user.type;
   photo: string = sessionStorage.getItem("photo") ?? "" ?? this.user.photo;
   index= this.photo?.lastIndexOf("assets");
   subPhoto : string= this.photo?.substring(this.index);
   imageUrl: string | ArrayBuffer | null= this.subPhoto ?? "assets/images/user.jpg"  ;
   selectedFile: File | null = null;

    constructor(
      private userService : UserService
    ){}

    ngOnInit(): void {
       this.getUser();
       console.warn(this.index)
       console.log(this.photo)
       console.log(this.imageUrl)
    }

    
    
    public getUser() : void
    {
       console.log("On test getUser()");
       this.userService.getUser(this.username).subscribe(
           (data: any)=>{
               this.user = data.object;
               console.log(this.user.username);
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

    async showHtmlUpdate() {
      Swal.fire({
        title: 'Mise à jour utilisateur',
        html: `
          <form id="contact-form">
            <div class="form-group">
              <input type="text" id="nom" class="swal2-input"  placeholder="Nom">
            </div>
            <div class="form-group">
              <input type="text" id="prenom" class="swal2-input" placeholder="Prenom">
            </div>
            <div class="form-group">
              <input type="text" id="username" class="swal2-input" placeholder="Username">
            </div>
            <div class="form-group">
              <input type="email" id="email" class="swal2-input"  placeholder="Email">
            </div>
          </form>
        `,
        //focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Valider",
        didOpen: () => {
          // Ici tu peux définir les valeurs
          (document.getElementById('nom') as HTMLInputElement).value = this.nom;
          (document.getElementById('prenom') as HTMLInputElement).value = this.prenom;
          (document.getElementById('username') as HTMLInputElement).value = this.username;
          (document.getElementById('email') as HTMLInputElement).value = this.email;
        },
        preConfirm: () => {
          
          const nom = (<HTMLInputElement>document.getElementById('nom')).value;
          const prenom = (<HTMLInputElement>document.getElementById('prenom')).value;
          const username = (<HTMLInputElement>document.getElementById('username')).value;
          const email = (<HTMLInputElement>document.getElementById('email')).value;
         
          if (!nom || !prenom|| !username || !email) {
            Swal.showValidationMessage('Veuillez remplir tous les champs');
            return false;
          }
          return { nom,prenom,username, email};
          
        }
      }).then((result) => {
        if (result.isConfirmed) {
          // Vous pouvez envoyer les données à votre API ou traitement ici
          console.log('Formulaire soumis:', result.value.nom);
          Swal.fire('Utilisateur modifié avec succès', 'Vos informations ont été envoyées.', 'success');
        }
      });
    }
}

