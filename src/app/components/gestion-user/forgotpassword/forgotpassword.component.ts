import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent {
  messageSubject : BehaviorSubject<string> = new BehaviorSubject<string>("");

  message$ : Observable<string> = this.messageSubject.asObservable();
  isLoading = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService : UserService
  ){}
  
  forgotPasswordForm = new FormGroup({
    email: new FormControl("",[
        Validators.required,
        Validators.email
    ]),
    
});

/*
 forgotPasswordForm = this.formBuilder.group({
     email : ["", Validators.required, Validators.email]
 });
*/
  public forgotPassword()
  { 
     const email = this.forgotPasswordForm.value.email ?? "";
     this.isLoading=!this.isLoading;
     this.userService.processForgotPassword(email).pipe(
        map((response : any)=>{
          console.log(response)
              if(response.success===true)
              {
                   this.isLoading=!this.isLoading;
                  
                   console.log("success......") 
                   
                   Swal.fire({
                    title: "Oubli Mot de Passe",
                    text:"Mail envoyé avec succès...",
                    icon: "success",
                    draggable: true
                  });  
                  this.forgotPasswordForm.reset(); 
              }
              else{
                this.isLoading=!this.isLoading;
              }
            }),
            catchError((error : Error)=>{
                if(error.name==""){

                }
                return "";
            })
     ).subscribe();
  }

  cancel(): void{
     this.router.navigate(['/']);
  }
}
