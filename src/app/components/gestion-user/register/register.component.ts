import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Behavior } from 'popper.js';
import { BehaviorSubject, catchError, map, Observable, shareReplay } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    
    userApiMessage$: BehaviorSubject<string> = new BehaviorSubject<string>("");
    isLoading : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private userService : UserService,
        private router: Router
    ){}

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
            Validators.required
        ])
    });


    public addUser(): void
    {
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
             this.isLoading.next(true);
             if(password == confirmPassword)
             {   
                 this.userApiMessage$.next("");
                 this.isLoading.next(false);
                 this.userService.postUser(user).pipe(
                    map((response: any)=>{
                    if(response.success===true)
                    {
                        this.isLoading.next(false);
                        Swal.fire({
                          title: "Utilisateur créé avec succès",
                          showClass: {
                            popup: `
                              animate__animated
                              animate__fadeInUp
                              animate__faster
                            `
                          },
                          hideClass: {
                            popup: `
                              animate__animated
                              animate__fadeOutDown
                              animate__faster
                            `
                          }
                        }).then((result) => {
                            if (result.isConfirmed) {
                                this.router.navigate(['/']);
                     
                            }
                          });;
                         
                         shareReplay();
                      }
                      else{
                         this.isLoading.next(false);
                         this.userApiMessage$.next("Problème lors de l'enregistrement")
                      }
                   }),
                   catchError((err: HttpErrorResponse)=>{
                      if(err.status===500 || err.status===0){
                          this.isLoading.next(false);
                          this.userApiMessage$.next("Nous avons rencontré un problème serveur.");
                      }
                      else if(err.status===409){
                        this.isLoading.next(false);
                        this.userApiMessage$.next("L'utilisateur existe déja.");
                      }
                       return "";
                   })
                 ).subscribe();
             }
             else
             {
                this.userApiMessage$.next("Les mots de passe sont différents.");
             }
        }
        else
        {
            this.userApiMessage$.next("Les champs sont obligatoires.");
        }
    }

    cancel(): void{
       this.router.navigate(['/']);
    }
}
