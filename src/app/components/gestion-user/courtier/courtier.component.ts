import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';
import {UtilsService} from 'src/app/services/utils.service';
import { BehaviorSubject, Observable, Subscription, map, combineLatest,tap } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';

export interface Courtier {
  photo: string;
  nom: string;
  prenom: string;
  email: string;
  phone: string;
}

const ELEMENT_DATA: Courtier[] = [
  {photo: "1", nom: 'TOMBEAU', prenom: "Chrisnor", email: 'tombeauc@gmail.com',phone:"38051274"},
  {photo: "2", nom: 'JEAN', prenom: "Edma Sherley", email: 'jeanedmasherley@gmail.com',phone:"49093578"},
  {photo: "3", nom: 'TOMBEAU', prenom: "Shedmaer Chrisley", email: 'tchrisley@gmail.com',phone:"31065231"},
  {photo: "4", nom: 'TOMBEAU', prenom: "Chrisnailove", email: 'tlove@gmail.com',phone:"42082521"}
  
];

@Component({
  selector: 'app-courtier',
  templateUrl: './courtier.component.html',
  styleUrls: ['./courtier.component.scss'],
  standalone: false
})
export class CourtierComponent implements OnInit{
   
  @ViewChild(MatPaginator) paginator! : MatPaginator;
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  displayedColumns: string[] = ['photo','nom', 'prenom', 'email','phone'];
  username: string | null= sessionStorage.getItem("username");
  email: string | null= sessionStorage.getItem("email");
  message$?: Observable<string>;
  showText : boolean = true;
  isLoading : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private userService: UserService,
     private utilsService: UtilsService
  ){}

  ngOnInit(): void {
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.message$ = this.userService.message$;
  }

  courtierForm = new FormGroup({
    email : new FormControl("",[
       Validators.required,
    ]),
    
  })

 attachUser()
 {
    this.userService.getAttachUsers(this.username?? "").subscribe();
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
  
}
