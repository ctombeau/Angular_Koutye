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
}
