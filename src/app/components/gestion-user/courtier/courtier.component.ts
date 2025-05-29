import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';
import {UtilsService} from 'src/app/services/utils.service';
import { BehaviorSubject, Observable, Subscription, map, combineLatest,tap } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { User } from 'src/app/models/user.model';

export interface Courtier {
  photo: string;
  nom: string;
  prenom: string;
  email: string;
  phone: string;
}


@Component({
  selector: 'app-courtier',
  templateUrl: './courtier.component.html',
  styleUrls: ['./courtier.component.scss'],
  standalone: false
})
export class CourtierComponent implements OnInit{
   
  @ViewChild(MatPaginator) paginator! : MatPaginator;
  displayedColumns: string[] = ['photo','nom', 'prenom', 'email','phone','action'];
  username: string | null= sessionStorage.getItem("username");
  email: string | null= sessionStorage.getItem("email");
  message$?: Observable<string>;
  showText : boolean = true;
  isLoading : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  users: User[]=[] ;
  dataSource = new MatTableDataSource<User>();
   
  constructor(private userService: UserService,
     private utilsService: UtilsService
  ){}

  ngOnInit(): void {
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.message$ = this.userService.message$;
      this.attachUser()
  }

  courtierForm = new FormGroup({
    email : new FormControl("",[
       Validators.required,
    ]),
    
  })

 attachUser()
 {
    this.userService.getAttachUsers(this.username?? "").subscribe(
       (data: any)=>{
           this.users = (data.object ?? []).map((user: User) => ({
                     ...user,
                photo: user.photo ? user.photo.substring(user.photo.lastIndexOf("assets")) : 'assets/images/user.jpg'
           }));
           this.dataSource.data = this.users;
           this.dataSource.paginator = this.paginator;
       },(error : HttpErrorResponse)=>{
            Swal.fire({
                text: "Erreur lors de la récupération des utilisateurs.",
                icon: "error"
           });
       });
 }
     
 askToAttachUser(){
    this.isLoading.next(true);
    const emailFrom = this.email??"";
    const emailTo= this.courtierForm.value.email?? "";
    this.userService.sendMailAttachUser(emailFrom, emailTo).subscribe((response : any)=>{
          this.isLoading.next(false);
            if(response.success===true){
               //this.utilsService.showMessage("Mail envoyé avec succès.", "success")
               Swal.fire({
                  text: "Mail envoyé avec succès.",
                  icon: "success"
              });
              this.courtierForm.reset();
            }
            else{
              //this.utilsService.showMessage("Erreur lors de l'envoi d'email.", "error")
              Swal.fire({
                text: "Erreur lors de l'envoi d'email.",
                icon: "error"
               });
               this.courtierForm.reset();
            }
      }, (error : HttpErrorResponse)=>{
              this.isLoading.next(false);
              Swal.fire({
                text: "Erreur lors de l'envoi d'email.",
                icon: "error"
               });
               this.courtierForm.reset();
      });
 }

 detachUser(usernameCour : string, nom: string, prenom: string){
    console.log("Detacher utilisateur")
    Swal.fire({
      title: nom + " " + prenom,
      text: "Voulez-vous le supprimer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, Supprimez-le"
      }).then((result) => {
          if (result.isConfirmed) {
                this.userService.processDetachUser(this.username??"",usernameCour).subscribe(
                   (data)=>{
                          Swal.fire({
                      title: "Supprimé!",
                      text: "Votre courtier a été supprimé.",
                      icon: "success"
                    });
                   },(error: HttpErrorResponse)=>{
                      
                       Swal.fire({
                        title: "Supprimé!",
                        text: "Erreur lors de la suppression.",
                        icon: "error"
                     });
                   }
                )
           }
      });
  }
  
}
