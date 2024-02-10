import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent {
  forgotPasswordForm = new FormGroup({
    email: new FormControl("",[
        Validators.required,
        Validators.email
    ]),
    
});

 public forgotPassword()
{

}
}
