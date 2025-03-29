import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss'],
  standalone: false
})
export class ResetpasswordComponent {
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
        Validators.required,
        Validators.email
    ])
});

 public resetPassword()
 {
   
 }
}
