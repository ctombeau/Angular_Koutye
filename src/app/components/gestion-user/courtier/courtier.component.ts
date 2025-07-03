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
import { EnService } from 'src/app/services/i18n/en.service';
import { FrService } from 'src/app/services/i18n/fr.service';
import { HtService } from 'src/app/services/i18n/ht.service';
import { GlobalService } from 'src/app/services/global.service';

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
  emailPropietaire: string | null= sessionStorage.getItem("email");
  message$?: Observable<string>;
  showText : boolean = true;
  isLoading : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  users: User[]=[] ;
  dataSource = new MatTableDataSource<User>();

  askAttach: string= "";
  picture: string="";
  action: string="";
  item: string="";
  of: string="";
  send: string="";
  firstname: string="";
  lastname: string="";
  phone: string="";
  errorUser: string="";
  smail: string="";
  echmail: string="";
  isDelete: string="";
  cDelete: string="";
  delete:string="";
  deleteCour: string=""; 
  errorDelete: string="";
  cancel: string="";
  email: string="";

  constructor(private userService: UserService,
     private utilsService: UtilsService,
     private enService: EnService,
     private frService: FrService,
     private htService: HtService,
     private gs : GlobalService
  ){}

  ngOnInit(): void {
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.message$ = this.userService.message$;
      this.attachUser();
      this.variableI18n();
  }

  courtierForm = new FormGroup({
    email : new FormControl("",[
       Validators.required,
    ]),
    
  })
  
  
   variableI18n(){
      this.gs.globalVariable$.subscribe(
          val=>{
                 if(val=="en"){
                   this.enService.getData().subscribe(response => {
                        this.askAttach=response.askAttach;
                        this.picture= response.picture;
                        this.action=response.action;
                        this.item=response.item;
                        this.of=response.of;
                        this.send=response.send;
                        this.firstname=response.firstname;
                        this.lastname=response.lastname;
                        this.phone=response.phone;
                        this.email=response.email;
                        this.errorUser=response.errorUser;
                        this.smail=response.smail;
                        this.echmail=response.echmail;
                        this.isDelete=response.isDelete;
                        this.cDelete=response.cDelete;
                        this.delete=response.delete;
                        this.deleteCour=response.deleteCour;
                        this.errorDelete=response.errorDelete;
                        this.cancel=response.cancel;
                    });
                 }else if(val=="fr"){
                   this.frService.getData().subscribe(response2 => {
                        this.askAttach=response2.askAttach;
                        this.picture= response2.picture;
                        this.action=response2.action;
                        this.item=response2.item;
                        this.of=response2.of;
                        this.send=response2.send;
                        this.firstname=response2.firstname;
                        this.lastname=response2.lastname;
                        this.phone=response2.phone;
                        this.email=response2.email;
                        this.errorUser=response2.errorUser;
                        this.smail=response2.smail;
                        this.echmail=response2.echmail;
                        this.isDelete=response2.isDelete;
                        this.cDelete=response2.cDelete;
                        this.delete=response2.delete;
                        this.deleteCour=response2.deleteCour;
                        this.errorDelete=response2.errorDelete;
                        this.cancel=response2.cancel;
                    });
                 }if(val=="ht"){
                   this.htService.getData().subscribe(response3 => {
                        this.askAttach=response3.askAttach;
                        this.picture= response3.picture;
                        this.action=response3.action;
                        this.item=response3.item;
                        this.of=response3.of;
                        this.send=response3.send;
                        this.firstname=response3.firstname;
                        this.lastname=response3.lastname;
                        this.phone=response3.phone;
                        this.email=response3.email;
                        this.errorUser=response3.errorUser;
                        this.smail=response3.smail;
                        this.echmail=response3.echmail;
                        this.isDelete=response3.isDelete;
                        this.cDelete=response3.cDelete;
                        this.delete=response3.delete;
                        this.deleteCour=response3.deleteCour;
                        this.errorDelete=response3.errorDelete;
                        this.cancel=response3.cancel;
                    });
                 }
             }
           )
      }

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
                text: this.errorUser,
                icon: "error"
           });
       });
 }
     
 askToAttachUser(){
    this.isLoading.next(true);
    const emailFrom = this.emailPropietaire??"";
    const emailTo= this.courtierForm.value.email?? "";
    this.userService.sendMailAttachUser(emailFrom, emailTo).subscribe((response : any)=>{
          this.isLoading.next(false);
            if(response.success===true){
               Swal.fire({
                  text: this.smail,
                  icon: "success"
              });
              this.courtierForm.reset();
            }
            else{
              Swal.fire({
                text: this.echmail,
                icon: "error"
               });
               this.courtierForm.reset();
            }
      }, (error : HttpErrorResponse)=>{
              this.isLoading.next(false);
              Swal.fire({
                text: this.echmail,
                icon: "error"
               });
               this.courtierForm.reset();
      });
 }

 detachUser(usernameCour : string, nom: string, prenom: string){
    Swal.fire({
      title: nom + " " + prenom,
      text: this.isDelete,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: this.cDelete,
      cancelButtonText:this.cancel
      }).then((result) => {
          if (result.isConfirmed) {
                this.userService.processDetachUser(this.username??"",usernameCour).subscribe(
                   (data)=>{
                          Swal.fire({
                      title: this.delete,
                      text: this.deleteCour,
                      icon: "success"
                    });
                   },(error: HttpErrorResponse)=>{
                      
                       Swal.fire({
                        title: this.delete,
                        text: this.errorDelete,
                        icon: "error"
                     });
                   }
                )
           }
      });
  }
  
}
