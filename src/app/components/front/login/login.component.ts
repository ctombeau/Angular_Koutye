import { Component, Injectable } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { environment } from 'src/environments/environment.development';
import { UserLogin } from 'src/app/models/user-login.model';
import { UserService } from 'src/app/services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
   showSpinner! : Observable<boolean>;
   userApiMessage$?: Observable<string>;
   routeMessage$? : Observable<string> ;
   testLogin : Subscription | undefined;
    
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
    private translate : TranslateService,
    private route : ActivatedRoute,
    private snackBar : MatSnackBar) { }

  ngOnInit(): void {
    
    this.userApiMessage$ = this.userService.message$;
    this.routeMessage$ = this.userService.routeMessage$;
   
     //this.route.data.subscribe(data=> console.warn("message: "+data["message"]))
    
      this.routeMessage$.subscribe(
         data => {
            if(data != "")
            {
               this.snackBar.open(data, 'dismiss', {
                  duration: 3000,
                  panelClass: ['blue-snackbar'],
                  verticalPosition :'top'
                });
            }
            
         } 
      );
     // this.initState();
  }

   public Login(): void
   {  
        const userLogin : UserLogin = new UserLogin();
        userLogin.username = this.loginForm.value.username ?? "";
        userLogin.password = this.loginForm.value.password ?? "";
        
        if(userLogin.username !="" && userLogin.password!="")
        {
           this.userService.postLogin(userLogin).subscribe();
        }
        else
        {
            console.log( "Les champs sont obligatoires");
            
            this.userApiMessage$?.subscribe({ 
              
                next : ()=>{
                    "Les champs sont obligatoires"
                }
             });
        } 
      
      //this.router.navigate(['/home']);
   }
 
   //test traduction
   public traductionExemple()
   {
      this.translate.get("exemple", {nom : this.loginForm.value.username}).subscribe((textAEcrire: string)=>{
          console.log(textAEcrire);
      });
   }
   
   initState(){
       this.testLogin = combineLatest([this.showSpinner, this.userService.isLoggedIn]).pipe(
         //   tap(async([spinner, login])=>{
         //       if(spinner==true && login==true){

         //       }
         //   })
       ).subscribe();
   }
}
