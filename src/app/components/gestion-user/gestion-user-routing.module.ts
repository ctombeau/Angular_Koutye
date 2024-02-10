import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ListUserComponent } from './list-user/list-user.component';
import { RegisterComponent } from './register/register.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'users', component:ListUserComponent},
      {path:'register', component:RegisterComponent},
      {path:'forgot-password',component:ForgotpasswordComponent},
      {path:'reset-password',component:ResetpasswordComponent}
    ])
  ],
  exports:[
    RouterModule
  ]
})
export class GestionUserRoutingModule { }
