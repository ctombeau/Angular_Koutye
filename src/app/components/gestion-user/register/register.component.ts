import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

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

    }
}
