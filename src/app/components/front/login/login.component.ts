import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment.development';
import { UserLogin } from 'src/app/models/user-login.model';
import { UserService } from 'src/app/services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
   showSpinner : boolean = false;
   userApiMessage$?: Observable<string>;
    
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

  constructor(private router: Router,
    private userService : UserService,
    private translate : TranslateService) { }

  ngOnInit(): void {
    //console.log(environment.apiUrl)
    this.userApiMessage$ = this.userService.message$;
  }

   public Login(): void
   {  
        this.showSpinner=true;
        const userLogin : UserLogin = new UserLogin();
        userLogin.username = this.loginForm.value.username ?? "";
        userLogin.password = this.loginForm.value.password ?? "";
        
        this.userService.postLogin(userLogin).subscribe();
   }
 
   //test traduction
   public traductionExemple()
   {
      this.translate.get("exemple", {nom : this.loginForm.value.username}).subscribe((textAEcrire: string)=>{
          console.log(textAEcrire);
      });
   }

}
