import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent {

  constructor(private formBuilder: FormBuilder,
    private router: Router
  ){}
  /*
  forgotPasswordForm = new FormGroup({
    email: new FormControl("",[
        Validators.required,
        Validators.email
    ]),
    
});
*/

 forgotPasswordForm = this.formBuilder.group({
     email : ["", Validators.required, Validators.email]
 });

  public forgotPassword()
  {
    console.log("Forgot password");
  }

  cancel(): void{
     this.router.navigate(['/']);
  }
}
