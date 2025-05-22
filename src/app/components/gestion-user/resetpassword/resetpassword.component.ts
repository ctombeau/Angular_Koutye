import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss'],
  standalone: false
})
export class ResetpasswordComponent {
  message : string = "";

  constructor(private userService : UserService,
    private router: Router
  ){}

  resetPasswordForm = new FormGroup({
    email : new FormControl("",[
        Validators.required,
        Validators.email
    ]),
    oldPassword: new FormControl("",[
         Validators.required
    ]),
    newPassword: new FormControl("",[
        Validators.required
    ]),
    newPassword2: new FormControl("",[
        Validators.required
    ])
});

 public resetPassword()
 {
    if(this.resetPasswordForm.value.newPassword==this.resetPasswordForm.value.newPassword2){
        this.userService.processResetPassword(this.resetPasswordForm.value).subscribe((data:any)=>{
        console.log(data)
        if(data.success===true){
           this.router.navigate(["/"]);
        }
    },(error:HttpErrorResponse)=>{
        if(error.status===500){
           this.message="Erreur serverur";
        }
     })
   }
  else{
      this.message="Les nouveaux mot de passe ne correspondent pas."  
   }
 }
}
