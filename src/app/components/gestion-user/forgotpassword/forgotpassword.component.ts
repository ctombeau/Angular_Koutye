import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent {

  constructor(private formBuilder: FormBuilder){}
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

 }
}
