import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { EnService } from 'src/app/services/i18n/en.service';
import { FrService } from 'src/app/services/i18n/fr.service';
import { HtService } from 'src/app/services/i18n/ht.service';
import { LanguageService } from 'src/app/services/language.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss'],
  standalone: false
})
export class ResetpasswordComponent  implements OnInit{
  message : string = "";
  email: string="";
  password: string="";
  cfPassword: string="";
  nPassword: string="";
  oPassword: string="";
  iPassword: string="";
  psw: string="";
  pser: string="";

  ngOnInit(): void {
      this.variableI18n();
  }

  constructor(private userService : UserService,
    private router: Router,
    private enService: EnService,
    private frService: FrService,
    private htService: HtService,
    private gs : GlobalService
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

  variableI18n(){
        this.gs.globalVariable$.subscribe(
           val=>{
               if(val=="en"){
                 this.enService.getData().subscribe(response => {
                      this.email=response.email;
                      this.password=response.password;
                      this.cfPassword=response.cfPassword;
                      this.nPassword=response.nPassword;
                      this.oPassword= response.oPassword;
                      this.iPassword=response.iPassword;
                      this.psw=response.psw;
                      this.pser=response.pser;
                  });
               }else if(val=="fr"){
                 this.frService.getData().subscribe(response2 => {
                      this.email=response2.email;
                      this.password=response2.password;
                      this.cfPassword=response2.cfPassword;
                      this.nPassword=response2.nPassword;
                      this.oPassword = response2.oPassword;
                      this.iPassword=response2.iPassword;
                      this.psw=response2.psw;
                      this.pser=response2.pser;
                  });
               }if(val=="ht"){
                 this.htService.getData().subscribe(response3 => {
                      this.email=response3.email;
                      this.password=response3.password;
                      this.cfPassword=response3.cfPassword;
                      this.nPassword=response3.nPassword;
                      this.oPassword= response3.oPassword;
                      this.iPassword=response3.iPassword;
                      this.psw = response3.psw;
                      this.pser=response3.pser;
                  });
               }
           }
         )
    }

 
 public resetPassword()
 {
    if(this.resetPasswordForm.value.newPassword==this.resetPasswordForm.value.newPassword2){
        this.userService.processResetPassword(this.resetPasswordForm.value).subscribe((data:any)=>{
          if(data.success===true){
            this.message="";
            this.router.navigate(["/"]);
          }
        },(error:HttpErrorResponse)=>{
            if(error.status===500){
              this.message=this.pser;
         }
     })
   }
   else{
      
      this.message=this.psw;
   }
 }
}
