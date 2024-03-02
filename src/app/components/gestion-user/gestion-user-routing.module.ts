import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ListUserComponent } from './list-user/list-user.component';
import { RegisterComponent } from './register/register.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { CourtierComponent } from './courtier/courtier.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'users', component:ListUserComponent},
      {path:'register', component:RegisterComponent},
      {path:'forgot-password',component:ForgotpasswordComponent},
      {path:'reset-password',component:ResetpasswordComponent},
      {path:'user-home', component: UserHomeComponent},
      {path:'user-detail',component: UserDetailComponent},
      {path:'courtier', component:CourtierComponent}
    ])
  ],
  exports:[
    RouterModule
  ]
})
export class GestionUserRoutingModule { }
