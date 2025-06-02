import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Behavior } from 'popper.js';
import { BehaviorSubject, catchError, map, Observable, shareReplay } from 'rxjs';
import { TypeUser } from 'src/app/models/type-user.model';
import { User } from 'src/app/models/user.model';
import { GlobalService } from 'src/app/services/global.service';
import { EnService } from 'src/app/services/i18n/en.service';
import { FrService } from 'src/app/services/i18n/fr.service';
import { HtService } from 'src/app/services/i18n/ht.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { FooterComponent } from "../../shared/template/footer/footer.component";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: false
})
export class RegisterComponent implements OnInit {
    
    userApiMessage$: BehaviorSubject<string> = new BehaviorSubject<string>("");
    isLoading : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    newUser : string="";
    lastname: string="";
    firstname: string="";
    username: string="";
    email: string="";
    password: string="";
    cfPassword: string="";
    phone: string="";
    typeUser: string="";
    cancel: string="";
    save: string="";
    broker: string="";
    householder:string="";
    leaseholder: string="";
    field: string="";
    ucas:string="";
    penr:string="";
    pser:string="";
    ued:string="";
    psw: string="";

    constructor(private userService : UserService,
        private router: Router,
        private enService: EnService,
        private frService: FrService,
        private htService: HtService,
        private gs : GlobalService
    ){}

    ngOnInit(): void {
        this.variableI18n();
    }

    registerForm = new FormGroup({
        nom : new FormControl("",[
            Validators.required
        ]),
        prenom: new FormControl("",[
             Validators.required
        ]),
        username: new FormControl("",[
            Validators.required
        ]),
        email: new FormControl("",[
            Validators.required,
            Validators.email
        ]),
        password:new FormControl("", [
           Validators.required
        ]),
        confirmPassword: new FormControl("",[
           Validators.required
        ]),
        type: new FormControl("",[
             Validators.required
        ]),
        phone: new FormControl("",[
            Validators.required,
            
        ])
    });

    variableI18n(){
        this.gs.globalVariable$.subscribe(
           val=>{
               if(val=="en"){
                 this.enService.getData().subscribe(response => {
                      this.newUser=response.newUser;
                      this.lastname=response.lastname;
                      this.firstname=response.firstname;
                      this.username=response.username;
                      this.email=response.email;
                      this.password=response.password;
                      this.cfPassword=response.cfPassword;
                      this.typeUser=response.typeUser;
                      this.phone=response.phone;
                      this.cancel=response.cancel;
                      this.save=response.save;
                      this.broker=response.broker;
                      this.householder=response.householder;
                      this.leaseholder=response.leaseholder;
                      this.field=response.field;
                      this.ucas = response.ucas;
                      this.penr = response.penr;
                      this.pser = response.pser;
                      this.ued = response.ued;
                      this.psw = response.psw;
                  });
               }else if(val=="fr"){
                 this.frService.getData().subscribe(response2 => {
                      this.newUser = response2.newUser;
                      this.lastname=response2.lastname;
                      this.firstname=response2.firstname;
                      this.username=response2.username;
                      this.email=response2.email;
                      this.password=response2.password;
                      this.cfPassword=response2.cfPassword;
                      this.typeUser=response2.typeUser;
                      this.phone=response2.phone;
                      this.cancel=response2.cancel;
                      this.save=response2.save;
                      this.broker=response2.broker;
                      this.householder=response2.householder;
                      this.leaseholder=response2.leaseholder;
                      this.field=response2.field;
                      this.ucas = response2.ucas;
                      this.penr = response2.penr;
                      this.pser = response2.pser;
                      this.ued = response2.ued;
                      this.psw= response2.psw;
                  });
               }if(val=="ht"){
                 this.htService.getData().subscribe(response3 => {
                      this.newUser = response3.newUser;
                      this.lastname=response3.lastname;
                      this.firstname=response3.firstname;
                      this.username=response3.username;
                      this.email=response3.email;
                      this.password=response3.password;
                      this.cfPassword=response3.cfPassword;
                      this.typeUser=response3.typeUser;
                      this.phone=response3.phone;
                      this.cancel=response3.cancel;
                      this.save=response3.save;
                      this.broker=response3.broker;
                      this.householder=response3.householder;
                      this.leaseholder=response3.leaseholder;
                      this.field=response3.field;
                      this.ucas = response3.ucas;
                      this.penr = response3.penr;
                      this.pser = response3.pser;
                      this.ued = response3.ued;
                      this.psw = response3.psw;
                  });
               }
           }
         )
    }

    public addUser(): void
    {
        this.isLoading.next(true);
        const nom  = this.registerForm.value.nom ?? "";
        const prenom = this.registerForm.value.prenom ?? "";
        const username = this.registerForm.value.username ?? "";
        const email = this.registerForm.value.email ?? "";
        const password = this.registerForm.value.password ?? "";
        const confirmPassword = this.registerForm.value.confirmPassword ?? "";
        const photo = "";
        const phone = this.registerForm.value.phone ?? "";
        const nomType = this.registerForm.value.type ?? "";

        const user: User = new User(nom,prenom,username,email,password,photo, phone,nomType);

        if (nom !="" && prenom !="" && username != "" && email != "" && password != "" && phone != "" &&nomType !="")
        {   
            
             if(password == confirmPassword)
             {   
                 this.userApiMessage$.next(""); 
                 this.userService.postUser(user).pipe(
                    map((response: any)=>{
                    if(response.success===true)
                    {   
                        this.isLoading.next(false);
                        Swal.fire({
                          text: this.ucas,
                          width:'300px',
                          icon: 'success'
                         
                        }).then((result) => {
                            if (result.isConfirmed) {
                                this.router.navigate(['/']);
                     
                            }
                          });
                         
                        // shareReplay();
                      }
                      else{
                         this.isLoading.next(false);
                         this.userApiMessage$.next(this.penr)
                      }
                   }),
                   catchError((err: HttpErrorResponse)=>{
                      if(err.status===500 || err.status===0){
                          this.isLoading.next(false);
                          this.userApiMessage$.next(this.pser);
                      }
                      else if(err.status===409){
                        this.isLoading.next(false);
                        this.userApiMessage$.next(this.ued);
                      }
                       return "";
                   })
                 ).subscribe();
             }
             else
             { 
                this.isLoading.next(false);
                this.userApiMessage$.next(this.psw);
             }
        }
        else
        {
            this.isLoading.next(false);
            this.userApiMessage$.next(this.field);
        }
    }

    fCancel(): void{
       this.router.navigate(['/']);
    }
}
