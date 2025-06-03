import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import { EnService } from 'src/app/services/i18n/en.service';
import { FrService } from 'src/app/services/i18n/fr.service';
import { HtService } from 'src/app/services/i18n/ht.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss'],
  standalone: false
})
export class ForgotpasswordComponent implements OnInit{
  messageSubject : BehaviorSubject<string> = new BehaviorSubject<string>("");

  message$ : Observable<string> = this.messageSubject.asObservable();
  isLoading : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  email: string="";
  cancel: string= "";
  send : string ="";
  forgotF: string="";
  smail: string="";
  echmail: string="";

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService : UserService,
    private enService : EnService,
    private frService: FrService,
    private htService: HtService,
    private gs: GlobalService
  ){}
  
  ngOnInit(): void {
      this.variableI18n();
  }

  forgotPasswordForm = new FormGroup({
    email: new FormControl("",[
        Validators.required,
        Validators.email
    ]),
    
});

variableI18n(){
  this.gs.globalVariable$.subscribe(
     val=>{
         if(val=="en"){
           this.enService.getData().subscribe(response => {
                
                this.email=response.email;
                this.cancel=response.cancel;
                this.send=response.send;
                this.forgotF=response.forgotF;
                this.smail = response.smail;
                this.echmail = response.echmail;
            });
         }else if(val=="fr"){
           this.frService.getData().subscribe(response2 => {
                this.email=response2.email;
                this.cancel=response2.cancel;
                this.send=response2.send;
                this.forgotF= response2.forgotF;
                this.smail = response2.smail;
                this.echmail = response2.echmail;
            });
         }if(val=="ht"){
           this.htService.getData().subscribe(response3 => {
                this.email=response3.email;
                this.cancel=response3.cancel;
                this.send=response3.send;
                this.forgotF=response3.forgotF;
                this.smail = response3.smail;
                this.echmail = response3.echmail;
            });
         }
     }
   )
 }

  public forgotPassword()
  { 
     const email = this.forgotPasswordForm.value.email ?? "";
     this.isLoading.next(true);
     this.userService.processForgotPassword(email).pipe(
        map((response : any)=>{
          console.log(response)
              if(response.success===true)
              {
                   this.isLoading.next(false);
                   this.forgotPasswordForm.reset();  
                   Swal.fire({
                    text:this.smail,
                    width:'300px',
                    icon: "success",
                    draggable: true
                  }).then((result) => {
                    if (result.isConfirmed) {
                        this.router.navigate(['/']);
                    }
                  });  
                  
              }
              else{
                this.isLoading.next(false);
                Swal.fire({
                    text:this.echmail,
                    width:'300px',
                    icon: "error",
                    draggable: true
                  });
              }
            }),
            catchError((error : Error)=>{
                this.isLoading.next(false);
                Swal.fire({
                    text:this.echmail,
                    width:'300px',
                    icon: "error",
                    draggable: true
                  });
                return "";
            })
     ).subscribe();
  }

  fCancel(): void{
     this.router.navigate(['/']);
  }
}
