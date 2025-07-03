import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
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
   lastname: string="";
   firstname: string="";
   username1: string="";
   email1: string="";
   phone1: string="";
   cancel: string="";
   titleUpdate: string="";
   userUpdate: string="";
   userUpdateError: string="";
   field : string="";
   menuOpen: boolean = false;
   del: string="";

   @ViewChild('exclu') excluRef!: ElementRef;

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
                      this.lastname=response.lastname;
                      this.firstname=response.firstname;
                      this.username1=response.username;
                      this.email1=response.email;
                      this.phone1=response.phone;
                      this.update=response.update;
                      this.cancel=response.cancel;
                      this.titleUpdate=response.titleUpdate;
                      this.userUpdate=response.updateUser;
                      this.userUpdateError=response.userUpdateError;
                      this.field=response.field;
                      this.del=response.del;
                  });
               }else if(val=="fr"){
                 this.frService.getData().subscribe(response2 => {
                      this.update=response2.update;
                      this.lastname= response2.lastname;
                      this.firstname=response2.firstname;
                      this.username1=response2.username;
                      this.email1=response2.email;
                      this.phone1=response2.phone;
                      this.update=response2.update;
                      this.cancel=response2.cancel;
                      this.titleUpdate=response2.titleUpdate;
                      this.userUpdate=response2.updateUser;
                      this.userUpdateError=response2.userUpdateError;
                      this.field=response2.field;
                      this.del=response2.del;
                  });
               }if(val=="ht"){
                 this.htService.getData().subscribe(response3 => {
                      this.update=response3.update;
                      this.lastname=response3.lastname;
                      this.firstname=response3.firstname;
                      this.username1=response3.username;
                      this.email1=response3.email;
                      this.phone1=response3.phone;
                      this.update=response3.update;
                      this.cancel=response3.cancel;
                      this.titleUpdate=response3.titleUpdate;
                      this.userUpdate=response3.updateUser;
                      this.userUpdateError=response3.userUpdateError;
                      this.field=response3.field;
                      this.del=response3.del;
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
                  Swal.fire(this.userUpdate,'','success').then((result)=>{
                         if(result.isConfirmed) {
                           this.getUser();
                           this.router.navigateByUrl('/');
                         }  
                    });
                 }
                 else{
                  Swal.fire(this.userUpdate,'','success').then((result)=>{
                         if(result.isConfirmed) {
                            this.getUser(); 
                            this.router.navigateByUrl(this.router.url);
                         }  
                    });
                 }
             }

           },(error: HttpErrorResponse)=>{
               Swal.fire(this.userUpdateError,'','error');
         })
      
    }
    
    public getUser() : void
    {
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
      this.menuOpen=false;
      event.stopPropagation();
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

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent): void {
      //const clickedInsideZone = this.zoneRef.nativeElement.contains(event.target);
      const clickedOnExcluded = this.excluRef.nativeElement.contains(event.target);

      if (clickedOnExcluded) {
        console.log('Ignoré : clic dans la zone exclue ou en dehors de la zone surveillée');
        return;
      }
      this.menuOpen=false;
      console.log('Clic détecté à l’extérieur du bouton exclu, dans la zone surveillée');
  }
    
    //@HostListener('document:click', ['$event'])
    onClickButton(event: MouseEvent): void {
        //this.menuOpen=false;
        console.log('Bouton cliqué, mais pas traité comme un clic global');
    }

    toggleMenu() {
     this.menuOpen = !this.menuOpen;
   }

   onDeletePhoto(event: Event) {
    this.menuOpen=false;
    const payload = {
        path: this.subPhoto,
        username: this.username
    };
    event.stopPropagation(); 
    console.log("Suppression de la photo...");
    
    this.userService.deletePicture(payload).subscribe((data: any)=>{
         console.log(data);
    },(error:HttpErrorResponse)=>{
       console.log(error);
    })
    
    this.menuOpen = false;
  }

    async showHtmlUpdate() {
      let nom= "", prenom="",username="",email="",phone="";

      Swal.fire({
        title: this.titleUpdate,
        html: `
          <form id="contact-form" class="container mt-4">
            <div class="row mb-3">
            <label for="nom" class="col-sm-5 col-form-label">${this.lastname}</label>
              <div class="col-sm-7">
                <input type="text" id="nom" class="form-control" placeholder="Nom">
              </div>
            </div>

            <div class="row mb-3">
              <label for="prenom" class="col-sm-5 col-form-label">${this.firstname}</label>
              <div class="col-sm-7">
                <input type="text" id="prenom" class="form-control" placeholder="Prenom">
              </div>
            </div>

            <div class="row mb-6">
              <label for="username" class="col-sm-5 col-form-label">${this.username1}</label>
              <div class="col-sm-7">
                <input type="text" id="username" class="form-control" placeholder="Username">
              </div>
            </div>

            <div class="row mb-3">
              <label for="email" class="col-sm-5 col-form-label">${this.email1}</label>
              <div class="col-sm-7">
                <input type="email" id="email" class="form-control" placeholder="Email">
              </div>
            </div>

            <div class="row mb-3">
              <label for="phone" class="col-sm-5 col-form-label">${this.phone1}</label>
              <div class="col-sm-7">
                <input type="text" id="phone" class="form-control" placeholder="Phone">
              </div>
            </div>
        </form>

        `,
        //focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: this.update,
        cancelButtonText: this.cancel,
        customClass: {
            confirmButton: 'my-confirm-btn',
            cancelButton: 'my-cancel-btn'
        },
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
            Swal.showValidationMessage(this.field);
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

