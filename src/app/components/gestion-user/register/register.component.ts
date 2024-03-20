import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Behavior } from 'popper.js';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    //userApiMessage$? : Observable<string>;

    userApiMessage$: BehaviorSubject<string> = new BehaviorSubject<string>("");

    constructor(private userService : UserService){}

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


    addUser()
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
             if(password == confirmPassword)
             {
                 this.userApiMessage$.next("");
                 this.userService.postUser(user).subscribe();
             }
             else
             {
                this.userApiMessage$.next("Les mots de passe sont differents.");
                
             }
        }
        else
        {
            this.userApiMessage$.next("Les champs sont obligatoires.");
        }
    }
}
