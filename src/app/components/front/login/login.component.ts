import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment.development';
import { UserLogin } from 'src/app/models/user-login.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
    
  loginForm = new FormGroup({
      username : new FormControl("",[
         Validators.required,
         Validators.pattern('^[^0-9][a-zA-Z0-9]+$')
      ]),
      password : new FormControl("",[
        Validators.required,
        Validators.pattern('^[A-Z][a-zA-Z0-9@#!$]*$')
      ])
  })

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(environment.apiUrl)
  }

   public Login(): void
   {
       console.log(this.loginForm.value.username);
       //user = new UserLogin(this.loginForm.value.username, this.loginForm.value.password);
       //this.router.navigate(['home']);
   }


}
