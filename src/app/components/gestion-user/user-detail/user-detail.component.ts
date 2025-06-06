import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { GlobalService } from 'src/app/services/global.service';
import { EnService } from 'src/app/services/i18n/en.service';
import { FrService } from 'src/app/services/i18n/fr.service';
import { HtService } from 'src/app/services/i18n/ht.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  standalone: false
})
export class UserDetailComponent implements OnInit{
   user! : any;
   id: any = sessionStorage.getItem("id") ?? "" +this.user.utilisateurId;
   username: string = sessionStorage.getItem("username") ?? this.user?.username ?? "";
   email: string =  "";
   prenom: string = "";
   nom: string =  "";
   phone: string = "";
   type: string = "";
   photo: string = sessionStorage.getItem("photo") ?? this.user?.photo ?? "";
   index= this.photo?.lastIndexOf("assets");
   subPhoto : string= this.photo?.substring(this.index);
   imageUrl: string | ArrayBuffer | null= this.subPhoto == "" ? "assets/images/user.jpg" : this.subPhoto ;
   selectedFile: File | null = null;
   usernameIsChanged : boolean = false;
   update : string="";

    constructor(
      private userService : UserService,
      private router : Router,
      private enService: EnService,
      private frService: FrService,
      private htService: HtService,
      private gs : GlobalService
    ){}

    gUser() : User{
      return this.user;
    }

    ngOnInit(): void {
       this.getUser();
       this.variableI18n();
    }

  variableI18n(){
        this.gs.globalVariable$.subscribe(
           val=>{
               if(val=="en"){
                 this.enService.getData().subscribe(response => {
                      this.update=response.update;
                  });
               }else if(val=="fr"){
                 this.frService.getData().subscribe(response2 => {
                      this.update=response2.update;
                  });
               }if(val=="ht"){
                 this.htService.getData().subscribe(response3 => {
                      this.update=response3.update;
                  });
               }
           }
         )
    }

updateUser(user: User){
  
       this.userService.putUser(this.id,user).subscribe(
           (response: any)=>{
            console.log(response.success)
             if(response.success==true){
                 if(this.usernameIsChanged==true){
                  Swal.fire('Utilisateur modifié avec succès','','success').then((result)=>{
                         if(result.isConfirmed) {
                           this.getUser();
                           this.router.navigateByUrl('/');
                         }  
                    });
                 }
                 else{
                  Swal.fire('Utilisateur modifié avec succès','','success').then((result)=>{
                         if(result.isConfirmed) {
                            this.getUser(); 
                            this.router.navigateByUrl(this.router.url);
                         }  
                    });
                 }
             }

           },(error: HttpErrorResponse)=>{
               if(error.status===500){
                  console.log(error)
               }
         })
      
    }
    
    public getUser() : void
    {
       console.log("On test getUser()");
       this.userService.getUser(this.username).subscribe(
           (data: any)=>{
               this.user = data.object;
               this.nom = data.object.nom;
               this.prenom= data.object.prenom;
               this.username = data.object.username;
               this.email = data.object.email;
               this.type = data.object.nomType;
               this.phone = data.object.phone;
               this.photo = data.object.photo;
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
      let nom= "", prenom="",username="",email="",phone="";

      Swal.fire({
        title: 'Mise à jour utilisateur',
        html: `
          <form id="contact-form">
            <div class="form-group">
              <label class="swal2-label">Nom</label>
              <input type="text" id="nom" class="swal2-input"  placeholder="Nom">
            </div>
            <div class="form-group">
              <label>Prenom</label>
              <input type="text" id="prenom" class="swal2-input" placeholder="Prenom">
            </div>
            <div class="form-group">
              <label>Username</label>
              <input type="text" id="username" class="swal2-input" placeholder="Username">
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="email" id="email" class="swal2-input"  placeholder="Email">
            </div>
            <div class="form-group">
              <label>Phone</label>
              <input type="text" id="phone" class="swal2-input"  placeholder="Phone">
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
          (document.getElementById('phone') as HTMLInputElement).value = this.phone;
        },
        preConfirm: () => {
          
          nom = (<HTMLInputElement>document.getElementById('nom')).value;
          prenom = (<HTMLInputElement>document.getElementById('prenom')).value;
          username = (<HTMLInputElement>document.getElementById('username')).value;
          email = (<HTMLInputElement>document.getElementById('email')).value;
          phone = (<HTMLInputElement>document.getElementById('phone')).value;
          if (!nom || !prenom|| !username || !email || !phone) {
            Swal.showValidationMessage('Veuillez remplir tous les champs');
            return false;
          }
          return { nom,prenom,username, email};
          
        }
      }).then((result) => {
        if (result.isConfirmed) {
          const user  = new User(nom, prenom, username, email, "", "", phone, "");
          if(username!==this.username){
             this.usernameIsChanged=true;
             this.updateUser(user);
          }
          else{
              this.usernameIsChanged=false;
              this.updateUser(user);
          }
            
        }
      });
    }
}

